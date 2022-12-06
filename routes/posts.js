const express = require('express')
const jwt = require('jsonwebtoken')
const authMiddleware = require('../middlewares/authMiddleware')
const { Post } = require('../models')
const joi = require('joi')

const router = express.Router()

router.get('/posts', async(req, res) => {
    const posts = await Post.findAll({include: 'user'})
    const result = posts.map(post => {
        return post
    })

    res.status(200).json({data: result})
})

const createPostSchema = joi.object({
    content: joi.string().required()
})

router.post('/post', authMiddleware, async(req, res) => {
    try {
        const {content} = await createPostSchema.validateAsync(req.body)
        const {user} = res.locals
        const userId = user.dataValues.userId
        const createPost = await Post.create({
            userId,
            content
        })
        return res.status(201).json({
            Status: '201',
            Message: 'Created'
        })
    } catch (err) {
        console.log(err);
        res.status(400).send({
            Status: '400',
            errorMessage: "The requested data type is not valid!"
        })
    }
})

router.post('/post/:idPost', authMiddleware, async(req, res) => {
    const {user} = res.locals
    const userId = user.dataValues.userId
    const {idPost} = req.params
    const post = await Post.findOne({where:{postId: idPost}})

    if (!post) {
        return res.status(404).send({
            Status: '404',
            errorMessage: 'Data not found!'
        })
    }

    if (userId !== post.userId) {
        return res.status(403).send({
            Status: '403',
            errorMessage: 'Forbidden!'
        })
    }

    if (post) {
        await post.destroy()
    }

    res.status(200).send({
        result: 'Success',
        success: true
    })
})

module.exports = router
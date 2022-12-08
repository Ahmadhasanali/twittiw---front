
const express = require('express')
const jwt = require('jsonwebtoken')
const authMiddleware = require('../middlewares/authMiddleware')
const { Comment } = require('../models')
const joi = require('joi')

const router = express.Router()

router.get('/post/:idPost/comment', async(req, res) => {
    const {idPost} = req.params
    const comment = await Comment.findAll({include: ['user', 'post'],where: {postId: idPost}, order: [['createdAt', 'DESC']]})
    const result = comment.map(item=>{
        return item
    })

    res.status(200).json({data: result})
})

const createCommentSchema = joi.object({
    comment: joi.string().required()
})
router.post('/post/:idPost/comment', authMiddleware, async(req, res) => {
    try {
        const {comment} = await createCommentSchema.validateAsync(req.body)
        const {user} = res.locals
        const userId = user.dataValues.userId
        const {idPost} = req.params
        const createComment = await Comment.create({
            userId,
            postId: idPost,
            comment
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

router.post('/comment/:idComment', authMiddleware, async(req, res) =>{
    const {user} = res.locals
    const userId = user.dataValues.userId
    const {idComment} = req.params
    const comment = await Comment.findOne({where:{commentId: idComment}})

    if (!comment) {
        return res.status(404).send({
            Status: '404',
            errorMessage: 'Data not found!'
        })
    }

    if (userId !== comment.userId) {
        return res.status(403).send({
            Status: '403',
            errorMessage: 'Forbidden!'
        })
    }

    if (comment) {
        await comment.destroy()
    }

    res.status(200).send({
        result: 'Success',
        success: true
    })

})

module.exports = router
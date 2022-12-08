const express = require('express')
const jwt = require('jsonwebtoken')
const authMiddleware = require('../middlewares/authMiddleware')
const { Post, Like, Retweet } = require('../models')
const joi = require('joi')
const { route } = require('./auth')

const router = express.Router()

router.get('/posts', async (req, res) => {
    const posts = await Post.findAll({ include: 'user', order: [['createdAt', 'DESC']] })
    const result = posts.map(post => {
        return post
    })

    res.status(200).json({data: result})
})

router.get('/post/:idPost', async(req, res) => {
    const {idPost} = req.params
    const post = await Post.findOne({where: {postId: idPost}, include: 'user'})
    
    res.status(200).json({data: post})
})

const createPostSchema = joi.object({
    content: joi.string().required()
})

router.get('/posts/me', authMiddleware, async(req, res) => {
    const {user} = res.locals
    const userId = user.dataValues.userId
    const posts = await Post.findAll({include: 'user', order: [['createdAt', 'DESC']], where: {userId}})
    const result = posts.map(post => {
        return post
    })

    res.status(200).json({data:result})
})

router.get('/posts/me', authMiddleware, async(req, res) => {
    const {user} = res.locals
    const userId = user.dataValues.userId
    const posts = await Post.findAll({include: 'user', order: [['createdAt', 'DESC']], where: {userId}})
    const result = posts.map(post => {
        return post
    })

    res.status(200).json({data:result})
})

router.post('/post', authMiddleware, async (req, res) => {
    try {
        const { content } = await createPostSchema.validateAsync(req.body)
        const { user } = res.locals
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

router.post('/post/:idPost', authMiddleware, async (req, res) => {
    const { user } = res.locals
    const userId = user.dataValues.userId
    const { idPost } = req.params
    const post = await Post.findOne({ where: { postId: idPost } })

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

router.post('/post/:postId/like', authMiddleware, async (req, res) => {
    try {
        const { postId } = req.params
        const { userId } = req.body

        const checkLike = async () => {
            const likeData = await Like.findOne({
                where: {
                    postId, userId
                }
            })
            return likeData
        }

        const like = await checkLike()
        // console.log(like)
        const checkPost = async (checkStatus) => {
            const posts = await Post.findOne({
                where: {
                    postId
                }
            })
            if (checkStatus) {
                posts.likes = posts.likes - 1
                await posts.save()
            } else {
                posts.likes = posts.likes + 1
                await posts.save()
            }
        }


        if (!like) {
            await Like.create({
                postId, userId, status: true
            })

            checkPost()
            return res.send("success")
        } else {
            checkStatus = like.status
            like.status = !checkStatus
            await like.save()
            checkPost(checkStatus)
            // const posts = await Post.findOne({
            //     where: {
            //         postId
            //     }
            // })
            // if (checkStatus) {
            //     posts.likes = posts.likes - 1
            //     await posts.save()
            // } else {
            //     posts.likes = posts.likes + 1
            //     await posts.save()
            // }
            res.send("success 1")
        }

    } catch (error) {
        res.status(400).send({
            errorMessage: error.message
        })
    }




})

router.get('/posts/:postId/like/:userId', authMiddleware, async (req, res) => {
    try {
        const { postId, userId } = req.params

        const like = await Like.findOne({
            where: {
                postId,
                userId
            }
        })

        if (like) {
            if (like.status) {
                return res.status(200).send({
                    likeId: like.likeId,
                    postId: like.postId,
                    status: true
                })
            } else {
                return res.status(200).send({
                    status: false
                })
            }
        }
        return res.status(200).send({
            status: false
        })
    } catch (error) {
        res.status(400).send({
            errorMessage: error.message
        })
    }
})

router.post('/posts/:postId/retweet/:userId', async (req, res) => {
    try {
        const { postId, userId } = req.params

        const post = await Retweet.findOne({
            where: {
                postId,
                userId
            }
        })
        if (post) {
            await post.destroy()
            return res.status(200).send({
                message: "success deleted"
            })
        }

        await Retweet.create({
            postId,
            userId
        })
        return res.status(200).send({
            message: "success insert"
        })
    } catch (error) {
        res.status(400).send({
            errorMessage: error.message
        })
    }
})

router.get('/posts/retweet/:userId', authMiddleware, async (req, res) => {
    try {
        const { userId } = req.params

        const post = await Retweet.findAll({
            include: ['user','post'],
            where: {
                userId
            }
        })

        return res.status(200).send({
            data:post
        })
    } catch (error) {
        res.status(400).send({
            errorMessage: error.message
        })
    }
})

module.exports = router
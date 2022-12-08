
const express = require('express')
const jwt = require('jsonwebtoken')
const authMiddleware = require('../middlewares/authMiddleware')
const { User } = require('../models')
const joi = require('joi')

const router = express.Router()

const userUpdateSchema = joi.object({
    fullName: joi.string().required(),
    bio: joi.string().required()
})

router.get('/user/me', authMiddleware, async(req, res)=> {
    const {user} = res.locals
    const userId = user.dataValues.userId
    const data = await User.findOne({where: {userId}})
    res.status(200).json({data})
})

router.post('/user/edit', authMiddleware, async (req, res) => {
    const { user } = res.locals
    const userId = user.dataValues.userId
    const { fullName, bio } = await userUpdateSchema.validateAsync(req.body)
    const data = await User.findOne({ where: { userId } })
    try {
        if (userId !== data.userId) {
            return res.status(400).json({ errorMessage: "Forbidden" })
        }
        if (!data) {
            return res.status(400).json({ errorMessage: "Data not found" })
        }

        if (data) {
            await data.update(
                {
                    fullName: fullName,
                    bio: bio
                })
        }
        return res.json({
            result: 'success',
            success: true,
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            Status: '400',
            errorMessage: "The requested data type is not valid!"
        })
    }
})

module.exports = router
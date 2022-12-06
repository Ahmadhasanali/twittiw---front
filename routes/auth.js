const express = require('express')
const Joi = require('joi')
const jwt = require('jsonwebtoken')
const { User } = require('../models')
const { Op } = require('sequelize');
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router();

const signUpRequest = Joi.object({
    email: Joi.string().email().required(),
    fullName: Joi.string().required(),
    nickName: Joi.string().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.string().required(),
})

router.post('/signup', async (req, res) => {
    try {
        const { email, fullName, nickName, password, confirmPassword } = await signUpRequest.validateAsync(req.body)
        if (password !== confirmPassword) {
            return res.status(400).send({
                errorMessage: "Confirm password not match"
            })
        }

        const user = await User.findAll({
            where: {
                email
            }
        })

        if (user.length) {
            return res.status(400).send({
                errorMessage: "Email already registered"
            })
        }

        await User.create({
            email,
            fullName,
            nickName,
            password
        })

        return res.status(201).send({
            status: "201",
            message: "User created"
        })
    } catch (error) {
        return res.status(400).send({
            errorMessage: error.message,
        });
    }
})

const loginRequest = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})

router.post('/login', async (req, res) => {
    const { email, password } = await loginRequest.validateAsync(req.body)

    const user = await User.findOne({
        where: {
            [Op.and]: [{ email }, { password }],
        },
    });

    if (!user) {
        return res.status(400).send({
            errorMessage: "Email or password incorect"
        })
    }
    const expires = new Date();
    expires.setMinutes(expires.getSeconds() + 60);
    const token = jwt.sign(
        { userId: user.userId },
        process.env.SECRET_KEY,
        { expiresIn: expires.getSeconds() }
    );

    res.cookie(process.env.COOKIE_NAME, `Bearer ${token}`, {
        expires: expires,
    });

    return res.status(200).send({ token, user });
})

module.exports = router;
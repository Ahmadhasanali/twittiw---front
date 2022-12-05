const express = require('express')
const Joi = require('joi')
const jwt = require('jsonwebtoken')

const router = express.Router();

const loginRequest = Joi.object({
    email: Joi.string().email().required(),
    fullName: Joi.string().required(),
    nickName: Joi.string().required(),
    password: Joi.string().required(),
})

router.post('/signup', async (req, res) => {
    try {
        const { email, fullName, nickName, password } = await loginRequest.validateAsync(req.body)
        
        
    } catch (error) {
        return res.status(400).send({
            errorMessage: error.message,
          });
    }
})

module.exports = router;
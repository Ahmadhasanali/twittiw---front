const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

module.exports = async (req, res, next) => {
    try {
        const cookies = req.cookies[process.env.COOKIE_NAME];
        console.log(cookies)
        if (!cookies) {
            return res.status(400).send({
                errorMessage: 'Login is required.',
            });
        }

        const [tokenType, tokenValue] = cookies.split(' ');
        if (tokenType !== 'Bearer') {
            return res.status(403).send({
                errorMessage: 'Login is required',
            });
        }

        const { userId } = jwt.verify(tokenValue, process.env.SECRET_KEY);
        const user = await User.findByPk(userId);
        res.locals.user = user;
        next();
    } catch (error) {
        return res.status(400).send({
            errorMessage: "error.message"
        });
    }
}
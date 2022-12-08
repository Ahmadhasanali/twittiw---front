const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

module.exports = async (req, res, next) => {
    try {
	    const {authorization} = req.headers
	    const [authType, authToken] =  (authorization || '').split(' ')

	    if(!authToken || authType !== 'Bearer'){
	    	return res.status(400).send({ errorMessage: 'You are not logged in'})
	    }

	    try {
	    	const {userId} = jwt.verify(authToken, process.env.SECRET_KEY)
	     	const user = await User.findByPk(userId)
            if (!user) {
                return res.status(401).send({ errorMessage: 'User not found'})
            }
	    	res.locals.user = user
	    	next()
	    }
	    catch (e){
	    	res.status(401).send({ errorMessage: 'Login Please!'})
	    }
    } catch (error) {
        return res.status(400).send({
            errorMessage: error.message
        });
    }
}
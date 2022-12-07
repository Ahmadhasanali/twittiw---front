const authRouter = require('./auth')
const Posts = require('./posts')
const Comment = require('./comments')

module.exports = [authRouter, Posts, Comment]

const authRouter = require('./auth')
const Posts = require('./posts')
const Comment = require('./comments')
const User = require('./user')

module.exports = [authRouter, Posts, Comment, User]
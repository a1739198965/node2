const Router = require('koa-router')
const {
  create,
  avatarInfo
} = require('../controller/use.controller')
const {
  verifyUser,
  handlePassword
} = require('../middleware/user.middleware')

const userRouter = new Router({ prefix: '/users' })

// 先执行verifyUser这个中间件， create这个中间件才会执行
userRouter.post('/', verifyUser, handlePassword, create)
userRouter.get('/:userId/avatar', avatarInfo)

module.exports = userRouter
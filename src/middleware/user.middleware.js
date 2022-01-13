const errorTypes = require('../constants/error-types')
const service = require('../service/user.service')
const md5password = require('../utils/password-handle')

const verifyUser = async (ctx, next) => {
  // 1. 获取用户名和密码
  const { name, password } = ctx.request.body

  // 2.判断用户名或者密码不为空
  if (!name || !password) {
    const error = new Error(errorTypes.NAME_ORPASSWORD_IS_REQUIRED)
    // 发射错误信息  'error发射的事件类型 error是传过来的参数
    return ctx.app.emit('error', error, ctx)
  }

  // 3.判断这次注册的用户名是没有被注册过
  const result = await service.getUserByName(name);
  if (result.length) {
    const error = new Error(errorTypes.USER_ALREADY_EXISTS);
    return ctx.app.emit('error', error, ctx);
  }


  await next()
}

// 对密码进行加密
const handlePassword = async (ctx, next) => {
  const { password } = ctx.request.body
  ctx.request.body.password = md5password(password)

  await next()
}


module.exports = {
  verifyUser,
  handlePassword
}
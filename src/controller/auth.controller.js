const jwt = require('jsonwebtoken');
const { PRIVATE_KEY } = require('../app/config')

class AuthController {
  async login(ctx, next) {
    const { id, name } = ctx.user
    // 生成token
    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24, // 设置过期时间1天
      algorithm: 'RS256'  //设置加密算法
    })
    ctx.body = { id, name, token }
  }

  async success(ctx, next) {
    ctx.body = '授权成功'
  }
}

module.exports = new AuthController();
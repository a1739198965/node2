const fs = require('fs');
const userService = require('../service/user.service');
const fileService = require('../service/file.service');
const { AVATAR_PATH } = require('../constants/file-path')

class UserController {
  async create(ctx) {
    // 获取用户请求传递的参数
    const user = ctx.request.body;

    // 查询数据
    const result = await userService.create(user);

    // 返回数据
    ctx.body = result;
  }

  async avatarInfo(ctx, next) {
    // 1.用户的头像是哪一个文件？
    const { userId } = ctx.params

    const avatarInfo = await fileService.getAvatarByUserId(userId)

    // 2.提供图像信息
    let fileName = null;
    let mimetype = null
    for (const avatar of avatarInfo) {
      fileName = avatar.filename
      mimetype = avatar.mimetype
    }

    ctx.response.set('content-type', mimetype)
    ctx.body = fs.createReadStream(`${AVATAR_PATH}/${fileName}`);
  }

}

module.exports = new UserController();
const fileService = require('../service/file.service')
const userService = require('../service/user.service')

const {
  APP_HOST,
  APP_PORT
} = require('../app/config')

class FileController {
  async saveAvatarInfo(ctx, next) {
    // 1.获取图像相关的信息
    const { path, type, size } = ctx.request.files.avatar
    const { id } = ctx.user
    const filename = path.split("\\").slice(2)

    // 2.将图片信息数据保存到数据库中
    await fileService.createAvatar(filename[0], type, size, id)

    // 将图片地址保存到user表中
    const avatarUrl = `${APP_HOST}:${APP_PORT}/users/${id}/avatar`
    await userService.updateAvatarUrlbyId(avatarUrl, id)

    ctx.body = {
      statusCode: 200,
      message: '用户上传头像成功~'
    }

    // console.log(ctx.request.files);
  }

  async savePictureInfo(ctx, next) {
    // 1.获取图像信息
    const files = ctx.request.files.picture
    const { id } = ctx.user
    const { momentId } = ctx.query


    // 2. 将所有的文件信息保存到数据库中
    for (let file of files) {
      let { path, type, size } = file
      const filename = path.split("\\").slice(2)
      await fileService.createFile(filename[0], type, size, id, momentId)
    }
    ctx.body = '动态配图上传成功~'
  }
}

module.exports = new FileController();

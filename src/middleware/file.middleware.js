const koaBody = require('koa-body')
const Jimp = require('jimp');

const {
  AVATAR_PATH,
  PICTURE_PATH
} = require('../constants/file-path')

const avatarUpload = koaBody({
  multipart: true,
  formidable: {
    uploadDir: AVATAR_PATH,
    keepExtensions: true,
    maxFieldsSize: 200 * 1024 * 1024
  }
})

const pictureUpload = koaBody({
  multipart: true,
  formidable: {
    uploadDir: PICTURE_PATH,
    keepExtensions: false,
    maxFieldsSize: 500 * 1024 * 1024,
    onFileBegin: (name, file) => {
    }
  }
})

const pictureResize = async (ctx, next) => {
  try {
    // 1.获取所有的图像信息
    const files = ctx.request.files.picture
    // 2.对图像进行处理（sharp/jimp）
    for (let file of files) {
      Jimp.read(file.path).then(image => {
        image.resize(1280, Jimp.AUTO).write(`${file.path}-large`)
        image.resize(640, Jimp.AUTO).write(`${file.path}-middle`)
        image.resize(320, Jimp.AUTO).write(`${file.path}-small`)
      })
    }
    await next()
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  avatarUpload,
  pictureUpload,
  pictureResize
}
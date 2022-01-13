const Router = require('koa-router')

const {
  verifyAuth
} = require('../middleware/auth.middleware')

const {
  avatarUpload,
  pictureResize,
  pictureUpload
} = require('../middleware/file.middleware')

const {
  saveAvatarInfo,
  savePictureInfo
} = require('../controller/file.controller')

const fileRouter = new Router({ prefix: '/upload' })

fileRouter.post('/avatar', verifyAuth, avatarUpload, saveAvatarInfo)
fileRouter.post('/picture', verifyAuth, pictureUpload, pictureResize, savePictureInfo)

module.exports = fileRouter
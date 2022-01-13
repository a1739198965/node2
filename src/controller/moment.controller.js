const fs = require('fs');
const fileService = require('../service/file.service');
const momentService = require('../service/moment.service')

const {
  PICTURE_PATH
} = require('../constants/file-path')

class MonentController {
  async create(ctx, next) {
    // 1.获取数据(user_id, content)
    const userId = ctx.user.id;
    const content = ctx.request.body.content;


    // 2.将数据插入到数据库
    const result = await momentService.create(userId, content)
    ctx.body = result;
  }

  async detail(ctx, next) {
    // 1.获取单个数据 /moment/1 -> ctx.params 拿到1
    const momentId = ctx.params.momentId

    // 2. 根据id去查询这条数据
    const result = await momentService.getMomentById(momentId)


    ctx.body = result
  }

  async list(ctx, next) {
    // 1.获取数据(offset/size)
    const { offset, size } = ctx.query

    // 2. 查询列表
    const result = await momentService.getMomentList(offset, size)
    ctx.body = result
  }

  async update(ctx, next) {
    // 1.获取参数
    const { momentId } = ctx.params
    const { content } = ctx.request.body

    // 2. 修改内容
    const result = await momentService.update(content, momentId)

    ctx.body = result
  }

  async remove(ctx, next) {
    // 1.获取momentId
    const { momentId } = ctx.params

    // 2. 删除内容
    const result = await momentService.remove(momentId)

    ctx.body = result
  }

  async addLabels(ctx, next) {
    const { labels } = ctx
    const { momentId } = ctx.params

    // 添加所有的标签
    for (const label of labels) {
      const isExists = await momentService.hasLabel(momentId, label.id)
      if (!isExists) {
        await momentService.addLabel(momentId, label.id)
      }
    }

    ctx.body = `添加标签成功~`
  }

  async fileInfo(ctx, next) {
    let { filename } = ctx.params
    const fileInfo = await fileService.getFileByFilename(filename)
    const { type } = ctx.query
    const types = ["small", "middle", "large"]
    if (types.some(item => item === type)) {
      filename = filename + '-' + type
    }

    ctx.response.set('content-type', fileInfo.mimetype);
    ctx.body = fs.createReadStream(`${PICTURE_PATH}/${filename}`);
  }
}


module.exports = new MonentController()
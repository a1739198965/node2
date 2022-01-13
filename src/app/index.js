const Koa = require('koa')
const koaBody = require('koa-body')
const errorHanler = require('./error-handle')
const useRoutes = require('../router')

const app = new Koa()

app.use(koaBody())
useRoutes(app)
app.on('error', errorHanler)

module.exports = app
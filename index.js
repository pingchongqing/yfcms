const Koa = require('koa')
const BodyParser = require('koa-bodyparser')
const fs = require('fs')
const controller = require('./controller')

const app = new Koa()

app.use(BodyParser())

app.use(controller())

app.listen(3002)

console.log('app started at port 3002')

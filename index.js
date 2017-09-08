const Koa = require('koa')
const BodyParser = require('koa-bodyparser')
const fs = require('fs')

const controller = require('./controller')
const staticFiles = require('./static-file')
const templating = require('./templating')


const app = new Koa()

const isProduction = process.env.NODE_ENV==='production'


app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    var
        start = new Date().getTime(),
        execTime;
    await next();
    execTime = new Date().getTime() - start;
    ctx.response.set('X-Response-Time', `${execTime}ms`);
});

if (! isProduction) {
    let staticFiles = require('./static-file');
    app.use(staticFiles('/static/', __dirname + '/static'));
}

app.use(BodyParser())

app.use(templating('views', {
  watch: !isProduction,
  noCache: !isProduction
}))

app.use(controller())


app.listen(3002)

console.log('app started at port 3002')

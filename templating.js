const nunjucks = require('nunjucks');
/*
*
*处理模板引擎
*/
function creatEnv(path, opts) {
  var
    autoescape = opts.autoescape===undefined ? true : opts.autoescape,
    noCache = opts.noCache||false,
    watch = opts.watch||false,
    throwOnUndefined = opts.throwOnUndefined||false,
    env = new nunjucks.Environment(
      new nunjucks.FileSystemLoader(path||'views', {
        noCache:noCache,
        watch:watch
      }), {
        autoescape:autoescape,
        throwOnUndefined:throwOnUndefined
      }
    )

    //过滤器
    if (opts.filters) {
      for (let f in opts.filters) {
        env.addFilter(f, opts.filters[f])
      }
    }
    return env
}


function templating(path, opts) {
  let env = creatEnv(path, opts)
  return async (ctx, next) => {
    ctx.render = function (view, model) {
      ctx.response.body = env.render(view, Object.assign({}, ctx.state||{}, model||{}))
      ctx.response.type = 'text/html'
    }
    await next()
  }
}

module.exports = templating

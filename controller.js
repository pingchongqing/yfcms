const fs = require('fs')

function addControllers(router) {
  let ctrfiles = fs.readdirSync(__dirname + '/controllers')
  let jsfiles = ctrfiles.filter(f => f.endsWith('.js'))
  for (let f of jsfiles) {
    let mapping = require(__dirname + '/controllers/' + f)
    addMapping(router, mapping)
  }
}

function addMapping(router, mapping) {
  for (let url in mapping) {
    if (url.startsWith('GET ')) {
      let path = url.substring(4)
      router.get(path, mapping[url])
    } else if (url.startsWith('POST ')) {
      let path = url.substring(5)
      router.post(path, mapping[url])
    }
  }
}

module.exports = function(dir) {
  let controllers_dir = dir || 'controllers'
  router = require('koa-router')()
  addControllers(router, controllers_dir)
  return router.routes()
}

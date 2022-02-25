var fastify = require('fastify')({ logger: true })
fastify.register(require('fastify-mongodb'), {
  forceClose: true,
  url: 'mongodb://localhost:27017/project1'
})
fastify.register(require('fastify-jwt'), {
    secret: 'supersecret'
  })
fastify.register(require('./usersRoutes'))
fastify.register(require('./bookRoutes'))
fastify.listen(3000, function (err, address) {
  if (err) {
    fastify.log.error(err)
  } else {
    fastify.log.info(address)
  }
})

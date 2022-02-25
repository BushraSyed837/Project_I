var fastifyPlugin = require('fastify-plugin')
async function addBooks (fastify, options) {
  fastify.decorate('addBooks', async function (book,obj) {
    const result = await book.insertOne(obj)
    return result
  })
}
module.exports = fastifyPlugin(addBooks)

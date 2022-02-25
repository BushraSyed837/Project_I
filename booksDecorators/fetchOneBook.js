var fastifyPlugin = require('fastify-plugin')
async function fetchOneBook (fastify, options) {
  fastify.decorate('fetchOneBook', async function (book,id) {
    const result = await book.findOne({ _id: id })
    return result
  })
}
module.exports = fastifyPlugin(fetchOneBook)
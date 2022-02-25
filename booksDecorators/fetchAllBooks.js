var fastifyPlugin = require('fastify-plugin')
async function fetchAllBooks (fastify, options) {
  fastify.decorate('fetchAllBooks', async function (book) {
    const result = await book.find().toArray()
    return result
  })
}
module.exports = fastifyPlugin(fetchAllBooks)
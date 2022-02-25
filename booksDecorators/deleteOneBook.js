var fastifyPlugin = require('fastify-plugin')
async function deleteOneBook (fastify, options) {
  fastify.decorate('deleteOneBook', async function (book, id) {
    const result = await book.deleteOne({ _id: id })
    return result
  })
}
module.exports = fastifyPlugin(deleteOneBook)

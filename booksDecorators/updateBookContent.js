var fastifyPlugin = require('fastify-plugin')
async function updateBookContent (fastify, options) {
  fastify.decorate('updateBookContent', async function (book,id,bookTitle,bookAuthor,bookEdition) {
    const result = book.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            bookTitle: bookTitle,
            bookAuthor: bookAuthor,
            bookEdition: bookEdition,
            updated_at: new Date()
          }
        },
        { returnDocument: 'after' }
      )
      return result
  })
}
module.exports = fastifyPlugin(updateBookContent)
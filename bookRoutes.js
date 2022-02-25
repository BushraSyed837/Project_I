var fastifyPlugin = require('fastify-plugin')
var _ = require('lodash')
const fetchOneBook = require('./booksDecorators/fetchOneBook')
const fetchAllBooks = require('./booksDecorators/fetchAllBooks')
const deleteOneBook = require('./booksDecorators/deleteOneBook')
const updateBookContent = require('./booksDecorators/updateBookContent')
const addBooks = require('./booksDecorators/addBooks')

const {
  fetchOneBookOpt: fetchOneBookSchema,
  fetchAllBooksOpt: fetchAllBooksSchema,
  addBookOpt: addBookSchema,
  updateBookContentOpt: updateBookContentSchema,
  deleteOneBookOpt: deleteOneBookSchema
} = require('./schemas/bookSchemas')

async function books (fastify, options) {
  fastify.register(fetchOneBook)
  fastify.register(fetchAllBooks)
  fastify.register(deleteOneBook)
  fastify.register(updateBookContent)
  fastify.register(addBooks)
  const book = await fastify.mongo.db.collection('books')

  // Fetch All Books
  fastify.get('/fetchAllBooks', fetchAllBooksSchema, async function (req, res) {
    return this.fetchAllBooks(book)
  })

  // Fetch One Book
  fastify.get('/fetchOneBook/:id', fetchOneBookSchema, async function (
    req,
    res
  ) {
    const id = this.mongo.ObjectId(req.params.id)
    return this.fetchOneBook(book, id)
  })

  // Add New Books
  fastify.post('/addBooks/:id', addBookSchema, async function (req, res) {
    const bookTitle = req.body.bookTitle
    const bookAuthor = req.body.bookAuthor
    const bookEdition = req.body.bookEdition
    const userId = this.mongo.ObjectId(req.params.id)
    const dateOfPublication = req.body.dateOfPublication
    const dateOfPurchase = new Date()
    if (
      bookTitle !== '' &&
      bookAuthor !== '' &&
      bookEdition !== '' &&
      userId !== '' &&
      dateOfPublication !== ''
    ) {
      const obj = {
        userId: userId,
        bookTitle: bookTitle,
        bookAuthor: bookAuthor,
        bookEdition: bookEdition,
        dateOfPublication: dateOfPublication,
        dateOfPurchase: dateOfPurchase
      }
      return this.addBooks(book, obj)
    } else {
      return 'Invalid Values'
    }
  })

  // Update Book Content
  fastify.put(
    '/updateBookContent/:id',
    updateBookContentSchema,
    async function (req, res) {
      const id = this.mongo.ObjectId(req.params.id)
      const bookTitle = req.body.bookTitle
      const bookAuthor = req.body.bookAuthor
      const bookEdition = req.body.bookEdition
      if (
        id !== '' &&
        bookTitle !== '' &&
        bookAuthor !== '' &&
        bookEdition !== ''
      ) {
        return this.updateBookContent(
          book,
          id,
          bookTitle,
          bookAuthor,
          bookEdition
        )
      } else {
        return 'Invalid Values'
      }
    }
  )
  fastify.delete('/deleteOneBook/:id', deleteOneBookSchema, async function (
    req,
    res
  ) {
    const id = fastify.mongo.ObjectId(req.params.id)
    return this.deleteOneBook(book, id)
  })
}

module.exports = fastifyPlugin(books)

const fetchOneBookOpt = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          userId: { type: 'string' },
          bookTitle: { type: 'string' },
          bookAuthor: { type: 'string' },
          bookEdition: { type: 'string' },
          dateOfPublication: { type: 'string' },
          dateOfPurchase: { type: 'string' }
        }
      }
    }
  }
}
const fetchAllBooksOpt = {
  schema: {
    response: {
      200: {
        type: 'array',
        properties: {
          _id: { type: 'string' },
          userId: { type: 'string' },
          bookTitle: { type: 'string' },
          bookAuthor: { type: 'string' },
          bookEdition: { type: 'string' },
          dateOfPublication: { type: 'string' },
          dateOfPurchase: { type: 'string' }
        }
      }
    }
  }
}
const updateBookContentOpt = {
  schema: {
    body: {
      type: 'object',
      required: ['bookTitle', 'bookAuthor', 'bookEdition'],
      properties: {
        bookTitle: { type: 'string' },
        bookAuthor: { type: 'string' },
        bookEdition: { type: 'string' }
      }
    },
    response: {
      200: {
        type: 'object',
        properties: {
          lastErrorObject: {
            n: { type: 'number' },
            updatedExisting: { type: 'boolean' }
          },
          value: {
            _id: { type: 'string' },
            userId: { type: 'string' },
            bookTitle: { type: 'string' },
            bookAuthor: { type: 'string' },
            dateOfPublication: { type: 'string' },
            dateOfPurchase: { type: 'string' },
            updated_at: { type: 'string' }
          }
        }
      }
    }
  }
}
const deleteOneBookOpt = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          acknowledged: { type: 'boolean' },
          deletedCount: { type: 'number' }
        }
      }
    }
  }
}
const addBookOpt = {
  schema: {
    body: {
      type: 'object',
      required: ['bookTitle', 'bookAuthor', 'bookEdition', 'dateOfPublication'],
      properties: {
        bookTitle: { type: 'string' },
        bookAuthor: { type: 'string' },
        bookEdition: { type: 'string' },
        dateOfPublication: { type: 'string' }
      }
    },
    response: {
      200: {
        type: 'object',
        properties: {
          acknowledged: { type: 'string' },
          insertedId: { type: 'string' }
        }
      }
    }
  }
}

module.exports = {
  fetchOneBookOpt,
  fetchAllBooksOpt,
  updateBookContentOpt,
  deleteOneBookOpt,
  addBookOpt
}

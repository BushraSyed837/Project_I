var LocalStorage = require('node-localstorage').LocalStorage
localStorage = new LocalStorage('./scratch')
var fastifyPlugin = require('fastify-plugin')

async function emailVerification (fastify, option) {
const user = fastify.mongo.db.collection('users')
  fastify.decorate('emailVerification', async function (id, input) {
    const code = localStorage.getItem('code')
    console.log(code, input)
    if (code == input) {
      const result = user.findOneAndUpdate(
        { _id: id },
        { $set: { verified: true } },
        { returnDocument: 'after' }
      )
      const token = fastify.jwt.sign({ id })
      return ( {token:token})
    } else {
      return 'Invalid Code'
    }
  })
}
module.exports = fastifyPlugin(emailVerification)

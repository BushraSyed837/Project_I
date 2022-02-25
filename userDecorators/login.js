var fastifyPlugin = require('fastify-plugin')
var nodemailer = require('nodemailer')
var bcrypt = require('bcrypt')

async function login (fastify, options) {
  const user = fastify.mongo.db.collection('users')
  fastify.decorate('login', async function (id, email, newpassword, token) {
    console.log(id)
    if (this.jwt.verify(token)) {
      const hash = await user.findOne(
        { _id: id },
        { projection: { _id: 0, password: 1 } }
      )
      console.log(hash)
      const match = await bcrypt.compare(
        String(newpassword),
        String(hash.password)
      )
      if (match) {
        const res = await user.findOne({ email: email })
        return res
      } else {
        return 'Invalid Username or Password'
      }
    } else {
      return 'Invalid Username or Password'
    }
  })
}

module.exports = fastifyPlugin(login)

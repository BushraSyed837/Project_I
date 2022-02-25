var fastifyPlugin = require('fastify-plugin')
var bcrypt = require('bcrypt')

async function updatePassword (fastify, options) {
  fastify.decorate('updatePassword', async function (
    id,
    previousPassword,
    newPassword,
    newConfirmPassword
  ) {
    const user = fastify.mongo.db.collection('users')
    if (newPassword == newConfirmPassword) {
      const hash = await user.findOne(
        { _id: id },
        { projection: { _id: 0, password: 1 } }
      )
      console.log(hash)
      const match = await bcrypt.compare(
        String(previousPassword),
        String(hash.password)
      )
      console.log(match)
      if (match) {
        const hashedPassword = await new Promise((resolve, reject) => {
          bcrypt.hash(newPassword, 10, function (err, hash) {
            if (err) reject(err)
            resolve(hash)
          })
        })
        const result = user.findOneAndUpdate(
          { _id: id, password: hash.password },
          {
            $set: { password: hashedPassword }
          },
          { returnDocument: 'after' }
        )
        return result
      } else {
        return 'Invalid Previous Password'
      }
    } else {
      return 'Password and Confirm Password not matched'
    }
  })
}
module.exports = fastifyPlugin(updatePassword)

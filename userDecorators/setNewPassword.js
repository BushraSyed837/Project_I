var fastifyPlugin = require('fastify-plugin')
var bcrypt = require('bcrypt')
async function setNewPassword (fastify, options) {
  const user = fastify.mongo.db.collection('users')
  fastify.decorate('setNewPassword', async function (
    id,
    newPassword,
    newConfirmPassword
  ) {
    const user = fastify.mongo.db.collection('users')
    if (newPassword == newConfirmPassword) {
        const hashedPassword = await new Promise((resolve, reject) => {
          bcrypt.hash(newPassword, 10, function (err, hash) {
            if (err) reject(err)
            resolve(hash)
          })
        })
        const result = user.findOneAndUpdate(
          { _id: id},
          {
            $set: { password: hashedPassword }
          },
          { returnDocument: 'after' }
        )
        return result
    } else {
      return 'Password and Confirm Password not matched'
    }
  })
}
module.exports = fastifyPlugin(setNewPassword)

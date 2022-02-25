var LocalStorage = require('node-localstorage').LocalStorage
localStorage = new LocalStorage('./scratch')
var fastifyPlugin = require('fastify-plugin')

const accountSid = 'AC7d34b586c8a80a04debf610a9530675d'
const authToken = '4ea032f648a81c0af60b192bc8dae9cc'

const client = require('twilio')(accountSid, authToken)
async function forgotPassword (fastify, options) {
  fastify.decorate('forgotPasswordAction', async function (id) {
    const user = fastify.mongo.db.collection('users')
    const rand = localStorage.getItem('forgot')
    const phoneNumber = await user.findOne(
      { _id: id },
      { projection: { _id: 0, phoneNumber: 1 } }
    )
    const result = await client.messages
      .create({
        body: `Your Verification Code is ${rand}`,
        from: '+19105974681',
        to: phoneNumber.phoneNumber
      })
      .then(message => {
        console.log(String(message.sid))
        return 'Verification Code Has Been Sent To Your Phone!'
      })
    return result
  })
}
module.exports = fastifyPlugin(forgotPassword)

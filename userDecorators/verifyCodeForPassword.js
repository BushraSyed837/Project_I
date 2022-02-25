var fastifyPlugin = require('fastify-plugin')
async function verifyCodeForPassword (fastify, options) {
  fastify.decorate('verifyCode', async function (input, code) {
    var result = ''
    console.log(code, input)
    if (code == input) {
      result = 'verified!'
    }
    return result
  })
}
module.exports = fastifyPlugin(verifyCodeForPassword)

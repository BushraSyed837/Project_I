var LocalStorage = require('node-localstorage').LocalStorage
localStorage = new LocalStorage('./scratch')
var fastifyPlugin = require('fastify-plugin')
var nodemailer = require('nodemailer')
async function emailConfirmation (fastify, options) {
  fastify.decorate('emailConfirmation', async function (email, username) {
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 465,
      host: 'smtp.gmail.com',
      auth: {
        user: 'dreamcoder111@gmail.com',
        pass: 'khiwxsepkyqzrffi'
      },
      secure: true
    })
    console.log('created')
    const rand = localStorage.getItem('code')
    const mailOpts = {
      from: 'no-reply@gmail.com',
      to: email,
      subject: 'testing',
      text: `Hello ${username}!\n\nWe have sent you the code below please put the below code in the verification field. Thank You\n\nVerification Code: ${rand}`
    }
    const result = await transporter.sendMail(mailOpts)
    return result
  })
}
module.exports = fastifyPlugin(emailConfirmation)

var fastifyPlugin = require('fastify-plugin')
var nodemailer = require('nodemailer')

var LocalStorage = require('node-localstorage').LocalStorage
localStorage = new LocalStorage('./scratch')

var registration = require('./userDecorators/registration')
var login = require('./userDecorators/login')
const emailConfirmation = require('./userDecorators/emailConfirmation')
const emailVerification = require('./userDecorators/emailVerification')
const updatePassword = require('./userDecorators/updatePassword')
const forgotPassword = require('./userDecorators/forgotPassword')
const verifyCodeForPassword = require('./userDecorators/verifyCodeForPassword')
const setNewPassword = require('./userDecorators/setNewPassword')
const {
  registrationOpt: registrationSchema,
  loginOpt: loginSchema,
  emailConfirmationOpt: emailConfirmationSchema,
  emailVerificationOpt: emailVerificationSchema,
  forgotPasswordOpt: forgotPasswordSchema,
  verifyCodeForPasswordOpt: verifyCodeForPasswordSchema,
  updatePasswordOpt: updatePasswordSchema,
  setNewPasswordOpt: setNewPasswordSchema
} = require('./schemas/userSchemas')

async function routes (fastify, options) {
  fastify.register(registration)
  fastify.register(login)
  fastify.register(emailConfirmation)
  fastify.register(emailVerification)
  fastify.register(updatePassword)
  fastify.register(forgotPassword)
  fastify.register(verifyCodeForPassword)
  fastify.register(setNewPassword)

  // registration route
  fastify.post('/registration', registrationSchema, async function (req, res) {
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
    const confirmPassword = req.body.confirmPassword
    const phoneNumber = req.body.phoneNumber
    if (
      (username !== '',
      email !== '',
      password !== '',
      confirmPassword !== '',
      phoneNumber !== '')
    ) {
      return this.registration(
        username,
        email,
        password,
        confirmPassword,
        phoneNumber
      )
    } else {
      return 'Something Is Missing'
    }
  })

  // login route
  fastify.post('/login/:id', loginSchema, async function (req, res) {
    const id = fastify.mongo.ObjectId(req.params.id)
    const email = req.body.email
    const password = req.body.password
    const token = req.body.token
    if ((id !== '' && email !== '', password !== '' && token !== '')) {
      return this.login(id, email, password, token)
    } else {
      return 'Something Is Missing'
    }
  })
  // fastify email verification

  fastify.get(
    '/emailConfirmation/:email/:username',
    emailConfirmationSchema,
    async function (req, res) {
      var rand = Math.floor(Math.random() * 100000 + 54)
      localStorage.setItem('code', rand)
      const email = req.params.email
      const username = req.params.username
      if (username !== '' && email !== '') {
        return this.emailConfirmation(email, username)
      } else {
        return 'Something Is Missing'
      }
    }
  )
  fastify.post(
    '/emailVerification/:id',
    emailVerificationSchema,
    async function (req, res) {
      const id = this.mongo.ObjectId(req.params.id)
      const input = Number(req.body.code)
      if (input != '' && id !== '') {
        return this.emailVerification(id, input)
      } else {
        return 'Something Is Missing'
      }
    }
  )
  fastify.put('/updatePassword/:id', updatePasswordSchema, async function (
    req,
    res
  ) {
    const id = this.mongo.ObjectId(req.params.id)
    const previousPassword = req.body.previousPassword
    const newPassword = req.body.newPassword
    const newConfirmPassword = req.body.newConfirmPassword
    if (
      id !== '' &&
      previousPassword !== '' &&
      newPassword !== '' &&
      newConfirmPassword !== ''
    ) {
      return this.updatePassword(
        id,
        previousPassword,
        newPassword,
        newConfirmPassword
      )
    } else {
      return 'Something Is Missing'
    }
  })
  fastify.get(
    '/forgotPasswordAction/:id',
    forgotPasswordSchema,
    async function (req, res) {
      var rand = Math.floor(Math.random() * 100000 + 54)
      localStorage.setItem('forgot', rand)
      const id = this.mongo.ObjectId(req.params.id)
      if (id != '') {
        return this.forgotPasswordAction(id)
      } else {
        return 'Something Is Missing'
      }
    }
  )
  fastify.post(
    '/verifyCodeForPassword',
    verifyCodeForPasswordSchema,
    async function (req, res) {
      const input = req.body.code
      const code = await localStorage.getItem('forgot')
      if (input != '' && code != '') {
        return this.verifyCode(input, code)
      } else {
        return 'Something Is Missing'
      }
    }
  )
  fastify.put('/setNewPassword/:id', setNewPasswordSchema, async function (
    req,
    res
  ) {
    const id = this.mongo.ObjectId(req.params.id)
    const newPassword = req.body.newPassword
    const newConfirmPassword = req.body.newConfirmPassword
    if (id !== '' && newPassword !== '' && newConfirmPassword !== '') {
      return this.setNewPassword(id, newPassword, newConfirmPassword)
    } else {
      return 'Something Is Missing'
    }
  })
}
module.exports = fastifyPlugin(routes)

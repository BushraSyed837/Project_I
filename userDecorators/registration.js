var bcrypt = require('bcrypt')
var fastifyPlugin = require('fastify-plugin')

async function registration(fastify, options) {
    const user = fastify.mongo.db.collection('users')
    fastify.decorate('registration', async function (username, email, password, confirmPassword, phoneNumber) {
        const hashedPassword = await new Promise((resolve, reject) => {
            bcrypt.hash(password, 10, function (err, hash) {
                if (err) reject(err)
                resolve(hash)
            })
        })
        const obj = {
            username: username,
            email: email,
            password: hashedPassword,
            phoneNumber: String('+92' + phoneNumber),
            verified: false
        }
        var result = {}
        if (
            email.match(
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
        ) {
            if (password === confirmPassword) {
                result = await user.insertOne(obj)
            } else {
                result = {
                    acknowledged: 'password and confirm password not matched'
                }
            }
        } else {
            result = {
                acknowledged: 'wrong email'
            }
        }
        return result
    })
}
module.exports = fastifyPlugin(registration)
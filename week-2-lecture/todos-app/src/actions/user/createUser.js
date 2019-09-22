'use strict'

const userManager = require('../../userManager')

function createUser (request, response) {

    Promise.resolve()
        .then(() => {
            const body = request.body

            if (!body.username) {
                throw new Error('username required to create user')
            }

            return userManager.create(body.username)
        })
        .then(user => {
            response.status(201)
            response.json({ todo: user })
        })
        .catch(({ code, message }) => {
            response.status(code === 'already-exists' ? 404 : 500)
            response.json({ error: message })
        })
}

module.exports = createUser

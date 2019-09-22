'use strict'

const todoManager = require('../todoManager')
const userManager = require('../userManager')

function deleteTodo (request, response) {

    userManager.get(request.params.user_id)
        .then(user => {
            if (!user) {
                const error = new Error('no such user')
                error.code = 'not-found'

                throw error
            }

            return todoManager.delete({ id: request.params.id })
        })
        .then(() => {
            response.status(204)
            response.end()
        })
        .catch(({ message }) => {
            response.status(500)
            response.json({ error: message })
        })
}

module.exports = deleteTodo

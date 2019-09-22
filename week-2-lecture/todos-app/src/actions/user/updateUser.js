'use strict'

const userManager = require('../../userManager')

function updateTodo (request, response) {

    Promise.resolve()
        .then(() => {
            const { description, birthday } = request.body

            if (!description && !birthday) {
                throw new Error('nothing to update, provide description, birthday or both')
            }

            const id = request.params.id

            return userManager.update(id, { description, birthday })
        })
        .then(todo => {
            response.status(200)
            response.json({ todo })
        })
        .catch(({ message, code }) => {
            response.status(code === 'not-found' ? 404 : 500)
            response.json({ error: message })
        })

}

module.exports = updateTodo

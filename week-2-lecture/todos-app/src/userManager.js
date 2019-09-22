const fs = require('fs').promises
const uuid = require('uuid/v4')

const DEFAULT_ENCODING = 'utf8'

class UserManager {
    constructor (filename) {
        this._filename = filename
    }

    async create (username) {
        const users = await this.read()

        let user = users.find(user => user.username === username)
        if (user) {
            const error = new Error(`${username} already exists`)
            error.code = 'already-exists'
            throw error
        }

        user = {
            id: uuid(),
            username
        }
        users.push(user)
        await this.write(users)
        return user
    }

    async get (id) {
        const users = await this.read()
        return users.find(user => user.id === id)
    }

    async update (id, { description, birthday }) {

        const users = await this.read()

        let user = users.find(user => user.id === id)
        if (!user) {
            const error = new Error(`User with ID ${id} does not exist`)
            error.code = 'not-found'
            throw error
        }

        if (description !== undefined) {
            user.description = description
        }

        if (birthday !== undefined) {
            user.birthday = birthday
        }

        await this.write(users)
        return user
    }

    async delete (id) {
        const users = await this.read()
        const filteredUsers = users.filter(user => user.id !== id)
        return this.write(filteredUsers)
    }

    read () {
        return fs.readFile(this._filename, DEFAULT_ENCODING)
            .then((contents) => JSON.parse(contents))
            .catch((err) => {
                if (err.code === 'ENOENT') return []
                else throw err
            })
    }

    write (users) {
        // third argument of stringify is nr of spaces indentation for readability
        return fs.writeFile(this._filename, JSON.stringify(users, null, 2))
    }
}

module.exports = new UserManager('./users.json')

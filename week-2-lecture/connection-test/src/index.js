'use strict'

const Express = require('express')
const morgan = require('morgan')

const Db = require('./db')

const PORT = 3000

const app = new Express()

// Use built-in JSON middleware to automatically parse JSON
app.use(Express.json())

app.use(morgan('dev'))

async function main() {

    await Db.connect()
    console.log('Successfully connected to database')
    console.log('Printing available tables:')
    console.log(await Db.query('show tables;'))

    app.listen(PORT, error => {
        if (error) {
            return console.error(error)
        }

        console.log(`Server started on http://localhost:${PORT}`)
    })
}

main()
    .catch(console.error)

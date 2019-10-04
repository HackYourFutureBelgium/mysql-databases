'use strict';

const Express = require('express');
const morgan = require('morgan');

const Db = require('./db');

// import our CRUD actions

const PORT = 3000;
const USERS = 'users';

const app = new Express();

// use built-in JSON middleware to automatically parse json
app.use(Express.json());

app.use(morgan('dev'));

const {
  createUser,
  updateUser,
  deleteUser,
  readUser,
  readUsers,

} = require('./actions/user')

app.get(`/${USERS}`, readUsers)
app.get(`/${USERS}/:id`, readUser);

app.post(`/${USERS}`, createUser);
app.put(`/${USERS}/:id`, updateUser);
app.delete(`/${USERS}/:id`, deleteUser);

Db.connect()
  .then(() => {
    console.log('Successfully connected to database');
    
    app.listen(PORT, error => {
      if (error) {
        return console.error(error);
      }

      console.log(`Server started on http://localhost:${PORT}`)
    });
  })
  .catch(console.error);
'use strict';

const Express = require('express');
const morgan = require('morgan');
const Db = require('./db');

// import our CRUD actions
const {
  createUser,
  updateUser,
  deleteUser,
  readUsers,
  readUser
} = require('./actions/user');

const {
  createTodo,
  readTodos,
  updateTodo,
  deleteTodo,
  readTodo,
  markDone
} = require('./actions');

const PORT = 3030;
const TODOS = 'todos';
const USERS = 'users';

const app = new Express();
// Use built-in JSON middleware to automatically parse JSON
app.use(Express.json());
// Use morgan like logger
app.use(morgan('dev'));

app.post(`/${USERS}`, createUser);
app.put(`/${USERS}/:id`, updateUser);
app.delete(`/${USERS}/:id`, deleteUser);
app.post(`/${USERS}/:user_id/${TODOS}`, createTodo);
app.get(`/${USERS}/:user_id/${TODOS}`, readTodos);
app.put(`/${USERS}/:user_id/${TODOS}/:id`, updateTodo);
app.delete(`/${USERS}/:user_id/${TODOS}/:id`, deleteTodo);

// Routes complementaries
app.get(`/${USERS}/`, readUsers);
app.get(`/${USERS}/:id`, readUser);
app.get(`/${USERS}/:user_id/${TODOS}/:id`, readTodo);
app.put(`/${USERS}/:user_id/${TODOS}/:id/done`, markDone);
app.put(`/${USERS}/:user_id/${TODOS}/:id/notdone`, markDone);

Db.connect()
  .then(() => {
    console.log('Successfully connected to database');

    app.listen(PORT, error => {
      if (error) {
        return console.error(error);
      }

      console.log(`Server started on http://localhost:${PORT}`);
    });
  })

  .catch(console.error);

'use strict';

const Express = require('express');
const morgan = require('morgan');

const Db = require('./db');

// import our CRUD actions
const { createUser, updateUser, deleteUser } = require('./actions/user');

const { createTodo, readTodos, updateTodo, deleteTodo } = require('./actions');

const PORT = 3030;
const TODOS = 'todos';
const USERS = 'users';

const app = new Express();

// Use built-in JSON middleware to automatically parse JSON
app.use(Express.json());

app.use(morgan('dev'));

app.post(`/${USERS}`, createUser);
app.put(`/${USERS}/:id`, updateUser);
app.delete(`/${USERS}/:id`, deleteUser);

app.post(`/${USERS}/:user_id/${TODOS}`, createTodo);
app.get(`/${USERS}/:user_id/${TODOS}`, readTodos);
app.put(`/${USERS}/:user_id/${TODOS}/:id`, updateTodo);
app.delete(`/${USERS}/:user_id/${TODOS}/:id`, deleteTodo);

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

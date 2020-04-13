'use strict';

const Express = require('express');
const morgan = require('morgan');

const Db = require('./db');

// import our CRUD actions

const PORT = 3000;
const USERS = 'users';
const TODOS = 'todos';

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

const {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
  markDone,
  notMarkDone
} = require ('./actions')

app.get(`/${USERS}`, readUsers)
app.get(`/${USERS}/:id`, readUser);

app.post(`/${USERS}`, createUser);
app.put(`/${USERS}/:id`, updateUser);
app.delete(`/${USERS}/:id`, deleteUser);

app.post(`/${USERS}/:user_id/${TODOS}`, createTodo);
app.get(`/${USERS}/:user_id/${TODOS}`, getTodos);

app.put(`/${USERS}/:user_id/${TODOS}/:id`, updateTodo);
app.delete(`/${USERS}/:user_id/${TODOS}/:id`, deleteTodo); 

app.put(`/${USERS}/:user_id/${TODOS}/:id/done`, markDone);
app.put(`/${USERS}/:user_id/${TODOS}/:id/notdone`, notMarkDone);



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
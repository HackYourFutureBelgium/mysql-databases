'use strict';


const deserializeTodo = require('./deserializeTodo');
const userManager = require('../userManager');
const todoManager = require('../todoManager');

function updateTodo (req, res) {
  const user_id = req.params.user_id;
  const todo_id = req.params.id;
  userManager.get(user_id)
    .then(() => {
      return deserializeTodo(req, res);
    })
    .then(({ description }) => {
      return todoManager.update(user_id, todo_id, description);
    })
    .then(todo => {
      res.status(201);
      res.json({ todo });
    })
    .catch((err) => {
      res.status(err.code === 'not-found' ? 404 : err.code ? 400 : 500);
      res.json({ error: err.message });
    });
  
}
module.exports = updateTodo;

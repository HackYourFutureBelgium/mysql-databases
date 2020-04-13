'use strict';

const deserializeTodo = require('./deserializeTodo');
const userManager = require('../userManager');
const todoManager = require('../todoManager');

function createTodo (req, res) {
  const user_id = req.params.user_id
  userManager.get(user_id)
    .then(() => {
      return deserializeTodo(req, res);
    })
    .then(({ description }) => {
    return todoManager.create(user_id, description)
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

module.exports = createTodo;
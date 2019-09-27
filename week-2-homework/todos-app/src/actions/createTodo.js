/* eslint-disable max-len */
'use strict';

const deserializeTodo = require('./deserializeTodo');
const userManager = require('../userManager');
const todoManager = require('../todoManager');
function createTodo(request, response) {
  userManager.get(request.params.user_id)
    .then(() => {
      return deserializeTodo(request, response);
    })
    .then(({ description }) => {
      return todoManager.create(request.params.user_id, description);
    })
    .then(todo => {
      response.status(201);
      response.json({ todo });
    })
    .catch((err) => {
      response.status(err.code === 'not-found' ? 404 : err.code ? 400 : 500);
      response.json({ error: err.message });
    });
}

module.exports = createTodo;

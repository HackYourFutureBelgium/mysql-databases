'use strict';

const deserializeTodo = require('./deserializeTodo');
const todoManager = require('../todoManager');
const userManager = require('../userManager');

function updateTodo(request, response) {
  userManager.get(request.params.user_id)
    .then(() => {
      return deserializeTodo(request, response);
    })
    .then(({ description }) => {
      const id = request.params.id;
      return todoManager.update(id, description);
    })
    .then(todo => {
      response.status(200);
      response.json({ todo });
    })
    .catch(({ message, code }) => {
      response.status(code === 'not-found' ? 404 : 500);
      response.json({ error: message });
    });
}

module.exports = updateTodo;

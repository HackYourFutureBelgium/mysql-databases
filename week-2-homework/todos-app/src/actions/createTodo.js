'use strict';

const deserializeTodo = require('./deserializeTodo');
const userManager = require('../userManager');
const todoManager = require('../todoManager');

function createTodo(request, response) {
  userManager.get(request.params.user_id)
    .then(user => {
      if (!user) {
        const error = new Error('no such user');
        error.code = 'not-found';

        throw error;
      }

      return deserializeTodo(request, response);
    })
    .then(({ description }) => {
      return todoManager.create({ userId: request.params.user_id, description });
    })
    .then(todo => {
      response.status(201);
      response.json(todo);
    })
    .catch((err) => {
      response.status(err.code ? 400 : 500);
      response.json({ error: err.message });
    });
}

module.exports = createTodo;

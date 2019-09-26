'use strict';

const todoManager = require('../todoManager');
const userManager = require('../userManager');

function readTodo(request, response) {
  userManager.get(request.params.user_id)
    .then(() => {
      const id = request.params.id;
      return todoManager.getTodo(id);
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

module.exports = readTodo;

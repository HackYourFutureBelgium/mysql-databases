'use strict';

const todoManager = require('../todoManager');
const userManager = require('../userManager');

function deleteTodo(request, response) {
  userManager.get(request.params.user_id)
    .then(() => {
      return todoManager.delete(request.params.user_id, request.params.id);
    })
    .then(() => {
      response.status(204);
      response.end();
    })
    .catch(({ message, code }) => {
      response.status(code === 'not-found' ? 404 : 500);
      response.json({ error: message });
    });
}

module.exports = deleteTodo;

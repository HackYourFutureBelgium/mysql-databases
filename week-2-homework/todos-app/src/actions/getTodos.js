'use strict';

const userManager = require('../userManager');
const todoManager = require('../todoManager');

function getTodos(request, response) {
  userManager.get(request.params.user_id)
    .then(user => {
      if (!user) {
        const error = new Error('no such user');
        error.code = 'not-found';

        throw error;
      }

      return todoManager.usersTodos(request.params.user_id);
    })
    .then(todos => {
      response.json({ todos });
      response.end();
    })
    .catch(({ message }) => {
      response.status(500);
      response.json({ error: message });
    });
}

module.exports = getTodos;

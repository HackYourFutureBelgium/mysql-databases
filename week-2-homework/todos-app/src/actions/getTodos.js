'use strict';

const userManager = require('../userManager');
const todoManager = require('../todoManager');

function getTodos(request, response) {
  userManager.get(request.params.user_id)
    .then(() => {
      return todoManager.usersTodos(request.params.user_id);
    })
    .then(todos => {
      response.json({ todos });
      response.end();
    })
    .catch(({ code, message }) => {
      response.status(code === 'not-found' ? 404 : 500);
      response.json({ error: message });
    });
}

module.exports = getTodos;

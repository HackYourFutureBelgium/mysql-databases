/* eslint-disable max-len */
'use strict';

const todoManager = require('../todoManager');
const userManager = require('../userManager');

function notMarkDone(request, response) {
  userManager.get(request.params.user_id)
    .then(() => {
      const id = request.params.id;
      return todoManager.setNotMarkDone(request.params.user_id, id);
    })
    .then(todo => {
      response.status(200);
      response.json({ todo });
    })
    .catch(({ message, code }) => {
      response.status(code === 'bad-request' ? 400 : code === 'not-found' ? 404 : 500);
      response.json({ error: message });
    });
}

module.exports = notMarkDone;

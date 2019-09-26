/* eslint-disable max-len */
'use strict';

const userManager = require('../../userManager');

function readUsers(request, response) {
  Promise.resolve()
    .then(() => {
      return userManager.getUsers();
    })
    .then(todos => {
      response.status(201);
      response.json({ todos });
    })
    .catch(({ code, message }) => {
      response.status(code === 'already-exists' ? 404 : 500);
      response.json({ error: message });
    });
}

module.exports = readUsers;

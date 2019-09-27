/* eslint-disable max-len */
'use strict';

const userManager = require('../../userManager');

function readUsers(request, response) {
  Promise.resolve()
    .then(() => {
      return userManager.getUsers();
    })
    .then(users => {
      response.status(201);
      response.json({ users });
    })
    .catch(({ code, message }) => {
      response.status(code === 'no-content' ? 204 : code === 'already-exists' ? 404 : 500);
      response.json({ error: message });
    });
}

module.exports = readUsers;

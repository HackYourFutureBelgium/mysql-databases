/* eslint-disable max-len */
'use strict';

const userManager = require('../../userManager');

function readUser(request, response) {
  Promise.resolve()
    .then(() => {
      const id = request.params.id;
      return userManager.get(id);
    })
    .then(user => {
      response.status(201);
      response.json({ user });
    })
    .catch(({ code, message }) => {
      response.status(code === 'not-found' ? 404 : 500);
      response.json({ error: message });
    });
}

module.exports = readUser;

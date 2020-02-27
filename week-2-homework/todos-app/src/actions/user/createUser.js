'use strict';

const userManager = require('../../userManager');

function createUser(request, response) {
  Promise.resolve()
    .then(() => {
      const body = request.body;

      if (!body.username) {
        const error = new Error('username required to create user');
        error.code = 'bad-request';
        throw error;
      }

      return userManager.create(body.username);
    })
    .then(user => {
      response.status(201);
      response.json({ user });
    })
    .catch(({ code, message }) => {
      response.status(code === 'bad-request' ? 400 : code === 'conflict' ? 409 : 500);
      response.json({ error: message });
    });
}

module.exports = createUser;

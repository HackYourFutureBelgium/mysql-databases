/* eslint-disable max-len */
'use strict';

const userManager = require('../../userManager');

function updateTodo(request, response) {
  Promise.resolve()
    .then(() => {
      const { description, birthday } = request.body;

      if (!description && !birthday) {
        const error = new Error('nothing to update, provide description, birthday or both');
        error.code = 'bad-request';
        throw error;
      }

      const id = request.params.id;
      return userManager.update(id, { description, birthday });
    })
    .then(user => {
      response.status(200);
      response.json({ user });
    })
    .catch(({ message, code }) => {
      response.status(code === 'not-found' ? 404 : code === 'bad-request' ? 400 : 500);
      response.json({ error: message });
    });
}

module.exports = updateTodo;

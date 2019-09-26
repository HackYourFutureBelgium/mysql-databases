/* eslint-disable max-len */
'use strict';

const todoManager = require('../todoManager');
const userManager = require('../userManager');

function markDone(request, response) {
  userManager.get(request.params.user_id)
    .then(() => {
      const id = request.params.id;
      let url = request.url.toLowerCase().indexOf('notdone');
      return todoManager.setMarkDone(id, url);
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

module.exports = markDone;

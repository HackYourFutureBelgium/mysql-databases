'use strict';

const userManager = require('../../userManager');

function deleteTodo(request, response) {
  const id = request.params.id;

  userManager.delete(id)
    .then(() => {
      response.status(204);
      response.end();
    })
    .catch(({ message }) => {
      response.status(500);
      response.json({ error: message });
    });
}

module.exports = deleteTodo;

'use strict';

const todoManager = require('../todoManager');
const userManager = require('../userManager');

function deleteTodo (req, res) {
  const user_id = req.params.user_id;
  const todo_id = req.params.id;

  userManager.get(user_id)
    .then(() => {
      return todoManager.delete(user_id, todo_id);
    })
    .then(() => {
      res.status(204);
      res.end();
    })
    .catch(({ message, code }) => {
      res.status(code === 'not-found' ? 404 : 500);
      res.json({ error: message });
  })
}

module.exports = deleteTodo;
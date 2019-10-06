'use strict';

const todoManager = require('../todoManager');
const userManager = require('../userManager');

function markDone (req, res) {
  const user_id = req.params.user_id;
  const todo_id = req.params.id;
  userManager.get(user_id)
    .then(() => {
      return todoManager.setMarkDone(user_id, todo_id);
    })
    .then(todo => {
      res.status(200);
      res.json({ todo });
    })
    .catch(({ message, code }) => {
      res.status(code === 'bad-request' ? 400 : code === 'not-found' ? 404 : 500);
      res.json({ error: message });
    });
}

module.exports = markDone;
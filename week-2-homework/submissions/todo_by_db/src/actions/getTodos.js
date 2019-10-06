'use strict';

const userManager = require('../userManager');
const todoManager = require('../todoManager');

function getTodos (req, res) {
  const user_id = req.params.user_id;
  userManager.get(user_id)
    .then(() => {
      return todoManager.usersTodos(user_id);
    })
    .then(todos => {
      res.status(200);
      res.json({ todos });
    })
    .catch(({ code, message }) => {
      res.status(code === 'not-found' ? 404 : 500);
      res.json({ error: message });
    });
}

module.exports = getTodos;
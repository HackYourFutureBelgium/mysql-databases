'use strict';

const userManager = require('../userManager');
const todoManager = require('../todoManager');

function getTodos (req, res) {
  const user_id = req.params.user_id;
  userManager.get(user_id)
    .then(() => {
      return todoManager.usresTodos(user_id);
    })
    .then(todos => {
      res.status(200);
      res.json({ todos });
    })
    .catch(({ code, message }) => {
      response.status(code === 'not-found' ? 404 : 500);
      response.json({ error: message });
    });
}

module.exports = getTodos;
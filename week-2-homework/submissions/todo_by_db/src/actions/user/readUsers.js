'use strict';

const userManager = require('../../userManager');

function readUsers (req, res) {
  Promise.resolve()
    .then(() => {
      return userManager.getUsers();
    })
    .then((users => {
      res.status(201);
      res.json({ users });
    }))
    .catch(({ code, message }) => {
      res.status(code === 'no-content' ? 204 : code === 'already-exists' ? 404 : 500);
      res.json({ error: message });
    });
}

module.exports = readUsers;
'use strict';
const userManager = require('../../userManager');

function readUser (req, res) {
  Promise.resolve()
    .then(() => {
      const id = req.params.id;
      return userManager.get(id);
    })
    .then(user => {
      res.status(201);
      res.json({ user });
    })
    .catch(({ code, message }) => {
      res.status(code === 'not-found' ? 404 : 500);
      res.json({ error: message });
    });
}

module.exports = readUser;
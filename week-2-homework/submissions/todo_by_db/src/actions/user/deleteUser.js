'use strict';

const userManager = require('../../userManager');

function deleteUser (req, res) {
  Promise.resolve()
    .then(() => {
      const id = req.params.id;

      return userManager.delete(id);
    })
    .then(user => {
      res.status(204);
      res.end();
    })
    .catch(({ message, code }) => {
      res.status(code === 'not-found' ? 404 : 500);
      res.json({ error: message });
    });
}

module.exports = deleteUser;
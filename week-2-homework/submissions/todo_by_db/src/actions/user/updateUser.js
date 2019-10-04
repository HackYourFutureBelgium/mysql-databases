'use strict';

const userManager = require('../../userManager');

function updateUser (req, res) {
  Promise.resolve()
    .then(() => {
      const { description, birthday } = req.body;
    
      if (!description && !birthday) {
        const error = new Error('nothing to update, provide description, birthday or both');
        error.code = 'bad-request';
        throw error;
      }

      const id = req.params.id;

      return userManager.updateUser(id, { description, birthday });
    })
    .then(user => {
      res.status(200);
      res.json({ user });
    })
    .catch(({ message, code }) => {
      res.status(code === 'not-found' ? 404 : code === 'bad-request' ? 400 : 500);
      res.json({ error: message });
    });
}

module.exports = updateUser;
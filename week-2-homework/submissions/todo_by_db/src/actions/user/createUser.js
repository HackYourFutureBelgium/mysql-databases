'use strict';

const userManager = require('../../userManager');

function createUser (req, res) {
  Promise.resolve()
    .then(() => {
      const body = req.body;

      if (!body.username) {
        const error = new Error('username required to create user');
        error.code = 'bad-request';
        throw error;
      }

      return userManager.create(body.username);
    })
    .then((user => {
      res.status(201);
      res.json({ user });
    }))
    .catch(({ code, message }) => {
      res.status(code === 'bad-request' ? 400 : code === 'conflict' ? 409 : 500);
      res.json({error : message})
    })

};

module.exports = createUser;
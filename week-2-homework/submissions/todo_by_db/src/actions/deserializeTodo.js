'use strict';

const todoManager = require('../todoManager');
const userManager = require('../../../../../../../newDatabase/databases/week-2-homework/todo_app_database/src/myuser/userManager');

function deserializeTodo (req) {
  const error = new Error(`must enter a description`);
  error.code = 'invalid-input';
  const { todo } = req.body;

  if (!todo) {
    throw error;
  }

  if (todo.description) {
    todo.description = todo.description.trim();
  }

  if (!todo.description) {
    throw error;
  }

  return todo;
}

module.exports = deserializeTodo;
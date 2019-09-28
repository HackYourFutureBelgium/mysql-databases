'use strict';

async function deserializeTodo(request) {
  const error = new Error('must enter a description');
  error.code = 'invalid-input';

  const { todo } = request.body;
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

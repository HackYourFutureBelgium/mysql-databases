'use strict';

//todo crud actions

module.exports = {
  createTodo: require('./createTodo'),
  getTodos: require('./getTodos'),
  updateTodo: require('./updateTodo'),
  deleteTodo: require('./deleteTodo'),
  markDone: require('./markDone'),
  notMarkDone: require('./notMarkDone')
}
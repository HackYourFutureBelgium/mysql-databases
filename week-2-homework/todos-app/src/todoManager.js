/* eslint-disable max-len */
'use strict';

const uuid = require('uuid/v4');
const Db = require('./db');

class TodoManager {
  async usersTodos(userId) {
    const todos = await this.selectUserTodos(userId);

    if (todos.length === 0) {
      const error = new Error(`The user with ${userId} does not have  TODOS`);
      error.code = 'not-found';
      throw error;
    }

    return todos;
  }

  async getTodo(id) {
    const todos = await this.selectTodo(id);
    const todo = todos.find(t => t.id === id);
    if (todo === undefined) {
      const error = new Error(`Todo with ID ${id} does not exist`);
      error.code = 'not-found';
      throw error;
    }

    return todo;
  }

  async create(userId, description) {
    const id = uuid();
    await this.insertTodo(id, description, userId);

    return this.getTodo(id);
  }

  async update(id, description) {
    await this.getTodo(id);
    await this.updateTodo(id, description);

    return this.getTodo(id);
  }

  async delete(id) {
    await this.getTodo(id);
    await this.deleteTodo(id);
  }

  async setMarkDone(id, url) {
    await this.getTodo(id);
    const todo = await this.selectTodoMarkState(id);
    const state = todo[0].state;

    if (url < 0) {
      if (state === 1) {
        const error = new Error(`Todo with ID ${id} is already with state done`);
        error.code = 'not-found';
        throw error;
      }
      await this.updateTodoMark(id, state);
    }
    else {
      if (state === 0) {
        const error = new Error(`Todo with ID ${id} is already with state not done`);
        error.code = 'not-found';
        throw error;
      }
      await this.updateTodoMark(id, state);
    }
    return this.getTodo(id);
  }

  //  CRUD
  selectTodo(id) {
    return Db.query(`SELECT * FROM activities WHERE id = '${id}'`);
  }

  selectUserTodos(userId) {
    return Db.query(`SELECT * FROM activities WHERE user = '${userId}'`);
  }

  selectTodoMarkState(id) {
    return Db.query(`SELECT state FROM activities WHERE id = '${id}'`);
  }

  insertTodo(id, description, userId) {
    return Db.query(`INSERT INTO activities (id,description,user) values ('${id}','${description}','${userId}')`);
  }

  updateTodo(id, description) {
    return Db.query(`UPDATE activities SET description= '${description}'WHERE id = '${id}'`);
  }

  updateTodoMark(id, state) {
    state === 1 ? state = 0 : state = 1;
    return Db.query(`UPDATE activities SET state= '${state}' WHERE id = '${id}'`);
  }

  deleteTodo(id) {
    return Db.query(`DELETE FROM activities WHERE id = '${id}'`);
  }
}

module.exports = new TodoManager();

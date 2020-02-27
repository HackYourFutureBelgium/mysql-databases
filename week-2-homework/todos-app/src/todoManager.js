/* eslint-disable max-len */
'use strict';

const uuid = require('uuid/v4');
const Db = require('./db');

class TodoManager {
  async usersTodos(userId) {
    const todos = await this.selectUserTodos(userId);

    if (todos.length === 0) {
      const error = new Error(`The user with ID introduced does not have activities TODO yet`);
      error.code = 'not-found';
      throw error;
    }

    return todos;
  }

  async getTodo(userid, id) {
    const todos = await this.selectTodo(userid, id);

    if (todos[0] === undefined) {
      const error = new Error(`Todo with ID ${id} does not exist or dont belong to this user.`);
      error.code = 'not-found';
      throw error;
    }

    return todos[0];
  }

  async create(userId, description) {
    const id = uuid();
    await this.insertTodo(id, description, userId);

    return this.getTodo(userId, id);
  }

  async update(userId, id, description) {
    await this.getTodo(userId, id);
    await this.updateTodo(userId, id, description);

    return this.getTodo(userId, id);
  }

  async delete(userId, id) {
    await this.getTodo(userId, id);
    await this.deleteTodo(userId, id);
  }

  async setMarkDone(userId, id) {
    await this.getTodo(userId, id);
    const todo = await this.selectTodoMarkState(id);
    const state = todo[0].state;

    if (state === 1) {
      const error = new Error(`Todo selected is already with state done`);
      error.code = 'bad-request';
      throw error;
    }
    await this.updateTodoMark(userId, id);

    return this.getTodo(userId, id);
  }

  async setNotMarkDone(userId, id) {
    await this.getTodo(userId, id);
    const todo = await this.selectTodoMarkState(id);
    const state = todo[0].state;

    if (state === 0) {
      const error = new Error(`Todo selected is already with state not done`);
      error.code = 'bad-request';
      throw error;
    }
    await this.updateTodoNotMark(userId, id);

    return this.getTodo(userId, id);
  }

  //  CRUD
  selectTodo(userid, id) {
    return Db.query(`SELECT * FROM activities WHERE id = '${id}' and user = '${userid}'`);
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

  updateTodo(userid, id, description) {
    return Db.query(`UPDATE activities SET description= '${description}' WHERE id = '${id}' and user ='${userid}'`);
  }

  updateTodoMark(userid, id) {
    return Db.query(`UPDATE activities SET state= 1 WHERE id = '${id}' and user='${userid}'`);
  }

  updateTodoNotMark(userid, id) {
    return Db.query(`UPDATE activities SET state= 0 WHERE id = '${id}' and user='${userid}'`);
  }

  deleteTodo(userid, id) {
    return Db.query(`DELETE FROM activities WHERE id = '${id}' and user='${userid}'`);
  }
}

module.exports = new TodoManager();

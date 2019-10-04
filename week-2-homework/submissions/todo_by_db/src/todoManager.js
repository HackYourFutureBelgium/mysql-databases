
const Db = require('./db');
const uuid = require('uuid/v4');


class TodoManager {
  async usresTodos (userId) {
    const todos = await this.selectUsersTodos(userId);
    if (todos.length === 0) {
      const error = new Error(`The user with ID introduced does not have activities TODO yet`);
      error.code = 'not-found';
      throw error;
    }

    return todos;
}

  async getTodo (userid, id) {
    const todos = await this.selectUsersTodos(userid, id);
    if (todos[0] === undefined) {
      const error = new Error(`Todo with Id ${id} does not exist or do not belong to the user`);
      error.code = 'not-found';
      throw error;
    }
    return todos[0];
}

  async create (userId, description) {
    const id = uuid();
    await this.insertTodo(id, description, userId);

    return this.getTodo(userId, description);
  }

  async update (userId, id, description) {
    await this.getTodo(userId, id);
    await this.updateTodo(userId, id, description);
  }

  async delete (userId, id) {
    await this.getTodo(userId, id);
    await this.deleteTodo(userId, id);
  }

  async setMarkDone (userId, id) {
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

  async setNotMarkDone (userId, id) {
    await this.getTodo(userId, id);
    const todo = await this.selectTodoMarkState(id);
    const state = todo[0].state;

    if (state = 0) {
      const error = new Error(`Todo selected is already with state not done`);
      error.code = 'bad-request';
      throw error;
    }

    await this.updateTodoNotMark(userId, id);

    return this.getTodo(userId, id);
  }
//===========CRUD actions
  selectTodo (userid, id) {
    return Db.query(`select * from activities where id = '${id}' and user = '${userid}'`)
  }
  selectUsersTodos (userId) {
    return Db.query(`select * from activities where user = ${userId}`);
  }

  insertTodo (id, description, userId) {
    return Db.query(`insert into activities (id, description, user) 
      values ('${id}','${description}','${userId}')`);
  }

  updateTodo (userid, id, description) {
    return Db.query(`update activities set description = ${description}
      where id = '${id}' and user = '${userid}'`);
  }

  deleteTodo (userid, id) {
    return Db.query(`delete from activities where user = '${userid}' and id = '${id}'`)
  }

  selectTodoMarkState (id) {
    return Db.query(`select state from activities where id = '${id}'`);
  }

  updateTodoMark (userid, id) {
    return Db.query(`update activities set state = 1 where id = '${id}'and user = '${userid}'`)
  }

  updateTodoNotMark (userid, id) {
    return Db.query(`update activities set state = 0 where id = '${id}' user = '${userid}'`);
  }
};

module.exports = new TodoManager();
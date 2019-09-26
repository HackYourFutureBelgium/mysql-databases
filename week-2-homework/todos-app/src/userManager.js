/* eslint-disable max-len */
'use strict';

const uuid = require('uuid/v4');
const Db = require('./db');

class UserManager {
  async getUsers() {
    const users = await this.selectUsers();

    if (users.length === 0) {
      const error = new Error(`Sorry!, We don't have users yet.`);
      throw error;
    }

    return users;
  }
  async create(username) {
    const id = uuid();
    const user = await this.selectUser(username);

    if (user.length) {
      const error = new Error(`${username} already exists`);
      error.code = 'already-exists';
      throw error;
    }

    await this.insertUser(username, id);
    return this.get(id);
  }

  async get(id) {
    const users = await this.selectId(id);
    const user = users.find(t => t.id === id);

    if (user === undefined) {
      const error = new Error(`User with ID ${id} does not exist`);
      error.code = 'not-found';
      throw error;
    }

    return user;
  }

  async update(id, { description, birthday }) {
    await this.get(id);

    if (description !== undefined && birthday !== undefined) {
      await this.updateUser(id, description, birthday);
    }
    else if (birthday !== undefined) {
      await this.updateUserBirthday(id, birthday);
    }
    else {
      await this.updateUserDescription(id, description);
    }

    return this.get(id);
  }

  async delete(id) {
    await this.get(id);
    await this.deleteUser(id);
  }

  //  CRUD
  selectUsers() {
    return Db.query(`SELECT * FROM users`);
  }

  selectUser(username) {
    return Db.query(`SELECT * FROM users WHERE username='${username}'`);
  }

  selectId(id) {
    return Db.query(`SELECT * FROM users WHERE id='${id}'`);
  }

  insertUser(username, id) {
    return Db.query(`INSERT INTO users (id, username) values ('${id}','${username}')`);
  }

  updateUserBirthday(id, birthday) {
    return Db.query(`UPDATE users SET birthday = '${birthday}' WHERE id ='${id}'`);
  }

  updateUserDescription(id, description) {
    return Db.query(`UPDATE users SET description = '${description}' WHERE id = '${id}'`);
  }

  updateUser(id, description, birthday) {
    return Db.query(`UPDATE users SET birthday = '${birthday}', description = '${description}' WHERE id = '${id}'`);
  }

  deleteUser(id) {
    return Db.query(`DELETE FROM users WHERE id = '${id}'`);
  }
}

module.exports = new UserManager();

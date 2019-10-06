'use strict';

const uuid = require('uuid/v4');
const Db = require('./db');

class userManager {
  async getUsers () {
    const users = await this.selectUsers();
    if (users.length === 0) {
      const error = new Error(`Sorry!, We don't have users yet.`);
      error.code = 'no-content';
      throw error;
    }

    return users;
  }

  async create (username) {
    const id = uuid();
    const user = await this.selectUser(username);

    if (user.length) {// checking if the user exist
      const error = new Error(`${username} already exists`);
      error.code = 'conflict';
      throw error;
    }

    await this.insertUser(username, id);

    return this.get(id);
  }

  async get (id) {
    const users = await this.selectId(id);
    const user = users.find(u => u.id === id);

    if (user === undefined) {
      const error = new Error(`User with ID introduced does not exist`);
      error.code = 'not-found';
      throw error;
    }

    return user;
  }

  async update (id, { description, birthday }) {
    await this.get(id);

    if (description !== undefined && birthday !== undefined) {
      await this.updateUser(id, description, birthday);
    }
    else if (birthday !== undefined) {
      await this.updateBirthday(id, birthday);
    }
    else {
      await this.updateDescription(id, description);
    }

    return this.get(id);
  }

  async delete (id) {
    await this.get(id);
    await this.deleteUser(id);
  }

  // CRUD
  selectUsers () {
    return Db.query(`select * from users`);
  }

  selectUser (username) {
    return Db.query(`select * from users where username = '${username}'`);
  }

  insertUser (username, id) {
    return Db.query(`insert into users (id, username) values ('${id}','${username}')`);
  }

  selectId (id) {
    return Db.query(`select * from users where id = '${id}'`)
  }

  updateUser (id, description, birthday) {
    return Db.query(`update users set description = '${description}', birthday = '${birthday}' where id = '${id}'`)
  }

  updateBirthday (id, birthday) {
    return Db.query(`update users set birthday = '${birthday}' where id = '${id}'`);
  }

  updateDescription (id, description) {
    return Db.query(`update users set description = '${description}' where id = '${id}'`);
  }

  deleteUser (id) {
    return Db.query(`delete from users where id = '${id}'`);
  }
}

module.exports = new userManager();
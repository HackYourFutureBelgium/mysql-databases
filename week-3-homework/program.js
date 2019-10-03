// This is the connector (also known as driver)
// that we can use to connect to a MySQL process
// and access its databases.

const {
  dbConnection,
  dbQuery
} = require('./sql');

class TodoModel {
  constructor(dbConnection) {
    this.dbConnection = dbConnection;
  }

  // Loads all the TODOs in the database
  load(callback) {
    const selectTodoItems = "SELECT * FROM todo_items";
    this.dbConnection.query(selectTodoItems, function (err, results, fields) {
      if (err) {
        callback(err);
        return;
      }
      callback(null, results);
    });

  }

  async read(id, callback) {
    // Write code and query to return TODO by id 

    const existTodo = await this.checkTodo(id).catch(errDb => errDb);
    if (!existTodo) {
      const err = new Error(`Todo doesn't Exist!`);
      err.code = 'Not-Found';
      throw err;
    }
    const todo = await this.getTodo(id);

    // placeholder to make sure your routes are working
    callback(todo);
  }

  async create(description, userId, callback) {
    // Write code and query to create a new TODO item

    if (description === undefined || userId === undefined) {
      const err = new Error(`description and userId are required!`);
      err.code = 'bad-request';
      throw err;
    }
    const checkUser = await this.checkUser(userId).catch(errDb => errDb);
    if (!checkUser) {
      const err = new Error(`The user doesn't Exist!`);
      err.code = 'Not-Found';
      throw err;
    }
    const newTodoId = await this.maxTodoId() + 1;
    const insertTodo = `INSERT INTO todo_items (id, text, is_completed, user_id) 
                       VALUES (${newTodoId}, '${description}', 0, ${userId})`;

    await dbQuery(insertTodo);
    const todo = await this.getTodo(newTodoId);

    // placeholder to make sure your routes are working
    callback(todo);
  }

  async update(id, description, callback) {
    // Write code and query to update and existing TODO item
    if (description === undefined) {
      const err = new Error(`description is  required!`);
      err.code = 'bad-request';
      throw err;
    }

    const existTodo = await this.checkTodo(id).catch(errDb => errDb);
    if (!existTodo) {
      const err = new Error(`Todo doesn't Exist!`);
      err.code = 'Not-Found';
      throw err;
    }

    const updateTodo =
      `UPDATE todo_items
    SET text = '${description}'
    WHERE id = ${id}`;
    await dbQuery(updateTodo);

    const todo = await this.getTodo(id);
    // placeholder to make sure your routes are working
    callback(todo)
  }

  async delete(id, callback) {
    // Write code and query to delete an existing TODO item
    const existTodo = await this.checkTodo(id).catch(errDb => errDb);
    if (!existTodo) {
      const err = new Error(`Todo doesn't Exist!`);
      err.code = 'Not-Found';
      throw err;
    }

    const existTagTodo = await this.checkTag(id);
    if (existTagTodo) {
      const err = new Error(`Todo has tags associates to them, their tags must be eliminated !`);
      err.code = 'Conflict';
      throw err;
    }

    const deleteTodo = `DELETE FROM todo_items WHERE id = ${id}`;
    await dbQuery(deleteTodo);
    // placeholder to make sure your routes are working
    callback(null)
  }

  async tagTodoItem(id, tagId, callback) {
    // Write code and query add a tag to a TODO item

    if (tagId === undefined) {
      const err = new Error(`tagId of tag is required!`);
      err.code = 'bad-request';
      throw err;
    }
    const existTodo = await this.checkTodo(id).catch(errDb => errDb);
    if (!existTodo) {
      const err = new Error(`Todo doesn't Exist!`);
      err.code = 'Not-Found';
      throw err;
    }

    const exisTodoItemTag = await this.checkTodoItemTag(id, tagId)
    if (exisTodoItemTag) {
      const err = new Error(`Todo the relation between todo_item and tag already exist!`);
      err.code = 'Conflict';
      throw err;
    }

    const addtodo_item_tag = `INSERT INTO todo_item_tag(todo_item_id, tag_id) VALUES(${id}, ${tagId})`;
    await dbQuery(addtodo_item_tag);

    const todo = await this.getTodo(id);
    // placeholder to make sure your routes are working
    callback(todo)
  }

  async untagTodoItem(id, tagId, callback) {
    // Write code and query remove a tag from a TODO item
    if (tagId === undefined) {
      const err = new Error(`description and userId are required!`);
      err.code = 'bad-request';
      throw err;
    }
    const existTodo = await this.checkTodo(id).catch(errDb => errDb);
    if (!existTodo) {
      const err = new Error(`Todo doesn't Exist!`);
      err.code = 'Not-Found';
      throw err;
    }

    const exisTodoItemTag = await this.checkTodoItemTag(id, tagId)
    if (!exisTodoItemTag) {
      const err = new Error(`Todo the relation between todo_item and tag doesn't exist!`);
      err.code = 'Not-Found';
      throw err;
    }

    const addtodo_item_tag = `DELETE FROM todo_item_tag  WHERE  todo_item_id='${id}' AND tag_id = '${tagId}'`;
    await dbQuery(addtodo_item_tag);

    const todo = await this.getTodo(id);
    // placeholder to make sure your routes are working
    callback(todo)
  }

  async markCompleted(id, callback) {
    // Write code to mark a TODO item as completed
    const existTodo = await this.checkTodo(id).catch(errDb => errDb);
    if (!existTodo) {
      const err = new Error(`Todo doesn't Exist!`);
      err.code = 'Not-Found';
      throw err;
    }

    const updateCompleteTodo = `UPDATE todo_items SET is_completed = 1 WHERE id='${id}'`;
    await dbQuery(updateCompleteTodo);

    const todo = await this.getTodo(id);
    // placeholder to make sure your routes are working
    callback(todo)
  }

  // Othes functions necesaries to do validations
  async checkTodo(id) {
    const selectTodo = `SELECT *  FROM todo_items WHERE id= '${id}'`;
    const todo = await dbQuery(selectTodo);
    return todo[0] === undefined ? false : true;
  }

  async checkUser(userId) {
    const selectUser =
      `SELECT * FROM users WHERE id= '${userId}'`;
    const todo = await dbQuery(selectUser);
    return todo[0] === undefined ? false : true;
  }

  async checkTag(id) {
    const selectUser = `SELECT * FROM todo_item_tag WHERE todo_item_id = ${id}`;
    const todo = await dbQuery(selectUser);
    return todo[0] === undefined ? false : true;
  }

  async maxTodoId() {
    const selectMaxUserId = `SELECT MAX(id) as max FROM todo_items`;
    const todo = await dbQuery(selectMaxUserId);
    return todo[0].max;
  }

  async checkTodoItemTag(id, tag_id) {
    const selectTodoItemTag = `SELECT * FROM todo_item_tag WHERE todo_item_id= '${id}' and tag_id = '${tag_id}'`;
    const todo = await dbQuery(selectTodoItemTag);
    return todo[0] === undefined ? false : true;
  }

  async getTodo(id) {
    const selectTodo =
      `SELECT todo_items.id AS id,todo_items.text AS description, 
    IF (todo_items.is_completed = 1,'Done', 'Not Done')  AS markStatus,
    users.id AS userId,
    CONCAT(users.first_name,' ', users.last_name) AS userName 
    FROM todo_items
    INNER JOIN users
    ON todo_items.user_id =  users.id
    WHERE todo_items.id= '${id}'`;

    const selectTags =
      `SELECT description AS tag
    FROM  tags INNER JOIN todo_item_tag
    ON tags.id = todo_item_tag.tag_id
    WHERE todo_item_tag.todo_item_id  = '${id}'`;

    const todo = await dbQuery(selectTodo);
    const tags = await dbQuery(selectTags);

    todo[0].tags = tags;
    return todo[0];
  }
}

const connectedModel = new TodoModel(dbConnection);
connectedModel.load((err, todoItems) => {
  if (err) {
    console.log("error loading TODO items:", err);
  }
  console.log("existing todo items:", todoItems);
});

module.exports = connectedModel;

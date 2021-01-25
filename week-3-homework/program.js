// This is the connector (also known as driver)
// that we can use to connect to a MySQL process
// and access its databases.
const mysql = require('mysql');

class TodoModel {
  constructor(dbConnection) {
    this.dbConnection = dbConnection;
  }

  // Loads all the TODOs in the database
  load(callback) {
    const selectTodoItems = "SELECT * FROM todo_items";
    this.dbConnection.query(selectTodoItems, function (err, results, ) {
      if (err) {
        callback(err);
        return;
      }
      callback(null, results);
    });
  }

  read(id, callback) {
    // Write code and query to return TODO by id
    const selectById = "SELECT * FROM todo_items where id = " + id;
    this.dbConnection.query(selectById, function (err, results) {
      if (err) {
        callback(err);
        return;
      }
      callback(null, results);
    })
  }

  create(description, userId, callback) {
    // Write code and query to create a new TODO item
    const createTodo = `INSERT INTO todo_items (text, user_id) VALUES ('${description}', '${userId}')`;
    this.dbConnection.query(createTodo, function (err, results) {
      if (err) {
        callback(err);
        return;
      }
      callback(null, results);
    })
  }

  update(id, description, callback) {
    // Write code and query to update and existing TODO item
    const updateTodo = `UPDATE todo_items SET text = '${description}' WHERE id = ${id}`;
    this.dbConnection.query(updateTodo, function (err, results) {
      if (err) {
        callback(err);
        return;
      }
      callback(null, results);
    })
  }

  delete(id, callback) {
    // Write code and query to delete an existing TODO item
    const deleteTodo = `DELETE FROM todo_items WHERE id = ${id}`;
    this.dbConnection.query(deleteTodo, function (err, results) {
      if (err) {
        callback(err);
        return;
      }
      callback(null, results);
    })
  }

  tagTodoItem(itemId, tagId, callback) {
    // Write code and query add a tag to a TODO item
    const tagItem = `INSERT INTO todo_item_tag(todo_item_id, tag_id) VALUES('${itemId}', '${tagId}')`;
    this.dbConnection.query(tagItem, function (err, results) {
      if (err) {
        callback(err);
        return;
      }
      callback(null, results);
    })
  }

  untagTodoItem(itemId, tagId, callback) {
    // Write code and query remove a tag from a TODO item
    const untagItem = `DELETE FROM todo_item_tag WHERE todo_item_id='${itemId}' AND tag_id = '${tagId}'`;
    this.dbConnection.query(untagItem, function (err, results) {
      if (err) {
        callback(err);
        return;
      }
      callback(null, results);
    })
  }

  markCompleted(itemId, callback) {
    // Write code to mark a TODO item as completed
    const markAsComplete = `UPDATE todo_items SET is_completed = 1 WHERE id = '${itemId}'`;
    this.dbConnection.query(markAsComplete, function (err, results) {
      if (err) {
        callback(err);
        return;
      }
      callback(null, results);
    })
  }
}

const dbConnection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfclass4',
  password: '1234',
  database: 'todo_app'
});

dbConnection.connect(function (err) {
  if (err != null) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + dbConnection.threadId);
});

const connectedModel = new TodoModel(dbConnection);
connectedModel.load((err, result) => {
  if (err) {
    console.error(err);
  } else {
    console.log(result);
  }
});

module.exports = connectedModel;

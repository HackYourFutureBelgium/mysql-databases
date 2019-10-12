// This is the connector (also known as driver)
// that we can use to connect to a MySQL process
// and access its databases.
const mysql = require('mysql');

class TodoModel {
  constructor(dbConnection) {
    this.dbConnection = dbConnection;
  }

  //Loads all the TODOs in the database
  load(callback) {
    const selectTodoItems = 'SELECT * FROM todo_items';
    this.dbConnection.query(selectTodoItems, function(err, results, fields) {
      if (err) {
        callback(err);
        console.log(result);
        return;
      }

      callback(null, results);
    });
  }

  read(id, callback) {
    // Write code and query to return TODO by id
    console.log('read is working');
    const selectTodoById = 'SELECT id, text FROM todo_items where id=?;';
    this.dbConnection.query(selectTodoById, id, function(err, results, fields) {
      // const selectTodoById = `SELECT id, text FROM todo_items where id = ${id}`;
      // this.dbConnection.query(selectTodoById, function(err, results, fields) {
      if (err) {
        callback(err);
        console.log(result);
        return;
      }
      // placeholder to make sure your routes are working
      callback(null, results);
    });
  }

  create(description, callback) {
    //Write code and query to create a new TODO item
    console.log('create is working!!!');
    const createTodo = `INSERT INTO todo_items SET text = '${description}', id `;
    this.dbConnection.query(createTodo, function(err, results, fields) {
      if (err) {
        callback(err);
        return;
      }
      // placeholder to make sure your routes are working
      callback(null, { description });
    });
  }

  update(id, description, callback) {
    console.log('update is working');
    //Write code and query to update and existing TODO item
    const updateTodo = `UPDATE todo_items SET text = '${description}' WHERE id = ${id}`;
    this.dbConnection.query(updateTodo, function(err, results, fields) {
      if (err) {
        callback(err);
        return;
      }
      // placeholder to make sure your routes are working
      callback(null, { id, description });
    });
  }

  delete(id, callback) {
    console.log('delete is working');
    const deleteTodo = `DELETE FROM todo_items WHERE id=${id} ;`;
    this.dbConnection.query(deleteTodo, function(err, results, fields) {
      if (err) {
        callback(err);
        return;
      }
      // placeholder to make sure your routes are working
      callback(null, { id });
    });
  }

  tagTodoItem(todoItemId, tagId, callback) {
    console.log('tagtodo is working');
    // Write code and query add a tag to a TODO item
    const tagTodo = `INSERT INTO todo_item_tag VALUES (${todoItemId}, ${tagId});`;
    this.dbConnection.query(tagTodo, function(err, results, fields) {
      if (err) {
        callback(err);
        return;
      }
      // placeholder to make sure your routes are working
      callback(null, { todoItemId, tagId });
    });
  }

  untagTodoItem(todoItemId, tagId, callback) {
    // Write code and query remove a tag from a TODO item
    const untagTodo = `DELETE FROM todo_item_tag where todo_item_id=${todoItemId} AND tag_id=${tagId};`;
    this.dbConnection.query(untagTodo, function(err, results, fields) {
      if (err) {
        callback(err);
        return;
      }
      // placeholder to make sure your routes are working
      callback(null, { todoItemId, tagId });
    });
  }

  markCompleted(itemId, callback) {
    // Write code to mark a TODO item as completed
    const markItemCompleted = `UPDATE todo_items SET is_completed=1 WHERE id=${itemId};`;
    this.dbConnection.query(markItemCompleted, function(err, results, fields) {
      if (err) {
        callback(err);
        return;
      }
      // placeholder to make sure your routes are working
      callback(null, { itemId });
    });
  }
}

const dbConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345',
  database: 'todo_app',
});

dbConnection.connect(function(err) {
  if (err != null) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + dbConnection.threadId);

  const todoModel = new TodoModel(dbConnection);
  todoModel.load(function(err, todoItems) {
    console.log('fff');
    if (err) {
      console.log('error loading TODO items:', err);
    }

    console.log('existing todo items:', todoItems);
  });
});

const connectedModel = new TodoModel(dbConnection);
connectedModel.load((err, result) => {
  if (err) {
    console.error(err);
  } else {
    console.log(result);
  }
});
connectedModel.read((err, result) => {
  if (err) {
    console.error(err);
  } else {
    console.log(result);
  }
});

module.exports = connectedModel;

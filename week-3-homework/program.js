'use strict';

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
    this.dbConnection.query(selectTodoItems, function (err, results, fields) {
      if (err) {
        callback(err);
        return;
      }

      callback(null, results);
    });
  }

  read(id, callback) {
    // Write code and query to return TODO by id
    const readTodoItem = `select * from  todo_items where id = ${id}`;
    this.dbConnection.query(readTodoItem, function (err, results, fields) {
      if (err) {
        callback(err)
        return;
      } 

      callback(null, results);
    })
  }

  create(id, description, callback) {
    // Write code and query to create a new TODO item
    const createTodoItem = `insert into todo_items (text, user_id ) values ('${description}', ${id})`;
    this.dbConnection.query(createTodoItem, function (err, results, fields) {
      if (err) {
        callback(err)
        return;
      } 

      callback(null, results);
    })

    // placeholder to make sure your routes are working
    // callback(null, { description })
  }

  update(id, description, callback) {
    // Write code and query to update and existing TODO item
    const updateTodoItem = `update todo_items set text = '${description}' where id = ${id} `;
    this.dbConnection.query(updateTodoItem, function (err, results, fields) {
      if (err) {
        callback(err)
        return;
      } 
      
      callback(null, results);
    })

    // placeholder to make sure your routes are working
    //callback(null, { id, description })
  }

  delete(id, callback) {
    // Write code and query to delete an existing TODO item
    const deleteTodoItem = `delete from todo_items where id = '${id}'`;
    this.dbConnection.query(deleteTodoItem, function (err, results, fields) {
      if(err){
        callback(err);
        return;
      }

      callback(null, results);
    })
    // placeholder to make sure your routes are working
    // callback(null, { id })
  }

  tagTodoItem(todoItemId, tagId, callback) {
    // Write code and query add a tag to a TODO item
    const tagTodo = `insert into todo_item_tag values ('${todoItemId}', '${tagId}')`;
    this.dbConnection.query(tagTodo, function (err, results, fields) {
      if(err){
        callback(err);
        return;
      }

      callback(null, results)
    })

    // placeholder to make sure your routes are working
    // callback(null, { todoItemId, tagId })
  }

  untagTodoItem(todoItemId, tagId, callback) {
    // Write code and query remove a tag from a TODO item
    const untagTodo = `delete from todo_item_tag where  todo_item_id = '${todoItemId}' and tag_id = '${tagId}' `;
    this.dbConnection.query(untagTodo, function (err, results, fields) {
      if(err){
        callback(err);
        return;
      }

      callback(null, results)
    })

    // placeholder to make sure your routes are working
    // callback(null, { todoItemId, tagId })
  }

  markCompleted(todoItemId, callback) {
    // Write code to mark a TODO item as completed
    const markCompleted = `update todo_items set  is_completed = 1 where id = '${todoItemId}'  `;

    this.dbConnection.query(markCompleted, function (err, results, fields) {
      if(err){
        callback(err);
        return;
      }

      callback(null, results);
    })

    // placeholder to make sure your routes are working
    // callback(null, { todoItemId });
  }
}

const dbConnection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'todo_app'
});

dbConnection.connect(function (err) {
  if (err != null) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + dbConnection.threadId);

  const todoModel = new TodoModel(dbConnection);
  todoModel.load(function (err, todoItems) {
    if (err) {
      console.log("error loading TODO items:", err);
    }

    console.log("existing todo items:", todoItems);
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

module.exports = connectedModel;

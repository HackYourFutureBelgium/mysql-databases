const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const connectedModel = require('./program.js');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send({ msg: 'hellow!' });
})

app.get('/:id', (req, res) => {
  const id = req.params.id;
  connectedModel.read(id, (err, result) => {
    if (err) {
      console.error(err);
      res.send(err.sqlMessage);
    } else {
      console.log('create successful');
      res.send(result);
    }
  })
});

app.post('/', (req, res) => {
  const {user_id } = req.body.todo;
  const { description } = req.body.todo;
  connectedModel.create(user_id, description, (err, result) => {
    if (err) {
      console.error(err);
      res.send(err.sqlMessage);
    } else {
      console.log('create successful');
      res.send(result);
    }
  })
});

app.patch('/', (req, res) => {
  const todo = req.body.todo;
  const id = todo.todo_id;
  const description = todo.description;
  connectedModel.update(id, description, (err, result) => {
    if (err) {
      console.error(err);
      res.send(err.sqlMessage)
    } else {
      console.log('update successful');
      res.send(result);
    }
  })
});

app.delete('/', (req, res) => {
  const id = req.body.todo.todo_id;
  connectedModel.delete(id, (err, result) => {
    if (err) {
      console.error(err);
      res.send(err.sqlMessage)
    } else {
      console.log('delete successful');
      res.send(result);
    }
  })
});

app.post('/tagTodoItem', (req, res) => {
  const tag_todo_item = req.body.tag_todo_item;
  const itemId = tag_todo_item.item_id;
  const tagId = tag_todo_item.tag_id;
  connectedModel.tagTodoItem(itemId, tagId, (err, result) => {
    if (err) {
      console.error(err);
      res.send(err.sqlMessage)
    } else {
      console.log('tag successful');
      res.send(result);
    }
  })
});

app.delete('/untagTodoItem', (req, res) => {
  const tag_todo_item = req.body.tag_todo_item;
  const itemId = tag_todo_item.item_id;
  const tagId = tag_todo_item.tag_id;

  connectedModel.untagTodoItem(itemId, tagId, (err, result) => {
    if (err) {
      console.error(err);
      res.send(err.sqlMessage)
    } else {
      console.log('untag successful');
      res.send(result);
    }
  })
});

app.patch('/markCompleted', (req, res) => {
  const tag_todo_item = req.body.tag_todo_item;
  const itemId = tag_todo_item.item_id;

  connectedModel.markCompleted(itemId, (err, result) => {
    if (err) {
      console.error(err);
      res.send(err.sqlMessage)
    } else {
      console.log('mark completed successful');
      res.send(result);
    }
  })
});

const port = 4000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

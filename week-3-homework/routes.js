const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const connectedModel = require('./program.js');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send({ msg: 'hellow!' });
});

app.get('/:id', (req, res) => {
  console.log('hello');
  const id = req.params.id;
  connectedModel.read(id, (err, result) => {
    if (err) {
      console.error(err);
      // send a helpful error response!
    } else {
      console.log('read successful');
      res.send(result);
    }
  });
});

app.post('/:description', (req, res) => {
  console.log('hello');
  //const userId = req.params.userId;
  const description = req.params.description;
  connectedModel.create(description, (err, result) => {
    if (err) {
      console.error(err);
      // send a helpful error response!
    } else {
      console.log('create-post successful');
      res.send(result);
    }
  });
});

app.patch('/tagId/:id/tag/:description', (req, res) => {
  console.log('hello from patch');
  const id = req.params.id;
  const description = req.params.description;
  connectedModel.update(id, description, (err, result) => {
    if (err) {
      console.error(err);
      // send a helpful error response!
    } else {
      console.log('update successful');
      res.send(result);
    }
  });
});

app.delete('/:id', (req, res) => {
  console.log('appdelete is working');
  const id = req.params.id;
  connectedModel.delete(id, (err, result) => {
    if (err) {
      console.error(err);
      // send a helpful error response!
    } else {
      console.log('delete successful');
      res.send(result);
    }
  });
});

app.post('/tagTodoItem/:tag_id/todoItem/:id', (req, res) => {
  console.log('app.post is working');
  const todoItemId = req.params.id;
  const tagId = req.params.tag_id;
  connectedModel.tagTodoItem(todoItemId, tagId, (err, result) => {
    if (err) {
      console.error(err);
      // send a helpful error response!
    } else {
      console.log('tag successful');
      res.send(result);
    }
  });
});

app.delete('/untagTodoItem/:tag_id/todoItem/:id', (req, res) => {
  const todoItemId = req.params.id;
  const tagId = req.params.tag_id;
  connectedModel.untagTodoItem(todoItemId, tagId, (err, result) => {
    if (err) {
      console.error(err);
      // send a helpful error response!
    } else {
      console.log('untag successful');
      res.send(result);
    }
  });
});

app.patch('/:todo_id', (req, res) => {
  const itemId = req.params.todo_id;
  connectedModel.markCompleted(itemId, (err, result) => {
    if (err) {
      console.error(err);
      // send a helpful error response!
    } else {
      console.log('mark completed successful');
      res.send(result);
    }
  });
});

const port = 4000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

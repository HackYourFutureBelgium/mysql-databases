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
  const id = req.params.id;
  connectedModel.read(id, (err, result) => {
    if (err) {
      console.error(err);
      // send a helpful error response!
    } else {
      console.log('create successful');
      res.send(result);
    }
  });
});

app.post('/:id', (req, res) => {
  const description = req.body.todo.description;
  const userId = req.body.todo.userId;
  connectedModel.create(description, userId, (err, result) => {
    if (err) {
      console.error(err);
      // send a helpful error response!
    } else {
      console.log('create successful');
      res.send(result);
    }
  });
});

app.patch('/:id', (req, res) => {
  const id = req.params.id;
  const description = req.body.todo.description;
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

app.post('/:id/tagTodoItem', (req, res) => {
  const itemId = req.params.id;
  const tagId = req.params.tag_id;
  connectedModel.tagTodoItem(itemId, tagId, (err, result) => {
    if (err) {
      console.error(err);
      res.send(err.sqlMessage);
    } else {
      console.log('tag successful');
      res.send(result);
    }
  });
});

app.delete('/:id/untagTodoItem', (req, res) => {
  const itemId = req.params.id;
  const tagId = req.params.tag_id;
  connectedModel.untagTodoItem(itemId, tagId, (err, result) => {
    if (err) {
      console.error(err);
      res.send(err.sqlMessage);
    } else {
      console.log('untag successful');
      res.send(result);
    }
  });
});

app.patch('/:id/markCompleted', (req, res) => {
  const itemId = req.params.id;
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

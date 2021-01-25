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
  const id = 'parse the description from the request';
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

app.post('/', (req, res) => {
  const description = 'parse the description from the request';
  connectedModel.create(description, (err, result) => {
    if (err) {
      console.error(err);
      // send a helpful error response!
    } else {
      console.log('create successful');
      res.send(result);
    }
  });
});

app.patch('/', (req, res) => {
  const id = 'parse the id from the request';
  const description = 'parse the description from the request';
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

app.delete('/', (req, res) => {
  const id = 'parse the id from the request';
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

app.post('/tagTodoItem', (req, res) => {
  const itemId = 'parse the id from the request';
  const tagId = 'parse the id from the request';
  connectedModel.tagTodoItem(itemId, tagId, (err, result) => {
    if (err) {
      console.error(err);
      // send a helpful error response!
    } else {
      console.log('tag successful');
      res.send(result);
    }
  });
});

app.delete('/untagTodoItem', (req, res) => {
  const itemId = 'parse the id from the request';
  const tagId = 'parse the id from the request';
  connectedModel.untagTodoItem(itemId, tagId, (err, result) => {
    if (err) {
      console.error(err);
      // send a helpful error response!
    } else {
      console.log('untag successful');
      res.send(result);
    }
  });
});

app.patch('/markCompleted', (req, res) => {
  const itemId = 'parse the id from the request';
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

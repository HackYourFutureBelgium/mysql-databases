const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const connectedModel = require('./program.js');
const {
  validateTodoItem,
  validateTodoTag,
  validateTodoId
} = require('./validate');

app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send({
    msg: 'hellow!'
  });
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
  const valid = validateTodoItem(req.body);
  if (!valid) {
    return res.status(400).send('todo, description and id are required')
  }

  const {
    id
  } = req.body.todo;
  const {
    description
  } = req.body.todo;
  connectedModel.create(id, description, (err, result) => {
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
  const valid = validateTodoItem(req.body);
  if (!valid) {
    return res.status(400).send('todo, description and id are require')
  }

  const todo = req.body.todo;
  const id = todo.id;
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
  const valid = validateTodoId(req.body);
  if (!valid) {
    return res.status(400).send('todo and id are required')
  }

  const id = req.body.todo.id;
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
  const valid = validateTodoTag(req.body);
  if (!valid) {
    return res.status(400).send('tag_todo_item, item_id and tag_id are required')
  }

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
  const valid = validateTodoTag(req.body);
  if (!valid) {
    return res.status(400).send('tag_todo_item, item_id and tag_id are required');
  }

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
  const valid = validateTodoId(req.body);
  if (!valid) {
    return res.status(400).send('todo and id are required')
  }

  const itemId = req.body.todo.id;

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
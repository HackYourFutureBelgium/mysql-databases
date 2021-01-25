const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const connectedModel = require('./program.js');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  connectedModel.load((err, result) => {
    if (err) {
      console.error(err);
      console.log(err);
    } else {
      res.send(result);
    }
  });
})

app.get('/:id', (req, res) => {
  const id = req.params.id;
  connectedModel.read(id, (err, result) => {
    if (err) {
      console.error(err);
      console.log(err);
    } else {
      console.log(result + 'aa');
      res.send(result);
    }
  })
});

app.post('/', (req, res) => {
  const description = req.body.description;
  const userId = req.body.user_id;
  connectedModel.create(description, userId, (err) => {
    if (err) {
      console.error(err);
      console.log(err);
    } else {
      console.log('create');
      res.send(result);
    }
  })
});

app.patch('/', (req, res) => {
  const id = req.body.id;
  const description = req.body.description;
  connectedModel.update(id, description, (err, result) => {
    if (err) {
      console.error(err);
      console.log(err);
      // send a helpful error response!
    } else {
      console.log('update');
      res.send(id + ' updated');
    }
  })
});

app.delete('/', (req, res) => {
  const id = req.body.id;
  connectedModel.delete(id, (err, result) => {
    if (err) {
      console.error(err);
      console.log(err);
      // send a helpful error response!
    } else {
      console.log('delete successful');
      res.send(id + ' deleted');
    }
  })
});

app.post('/tagTodoItem', (req, res) => {
  const itemId = req.body.id;
  const tagId = req.body.tag_id;
  connectedModel.tagTodoItem(itemId, tagId, (err, result) => {
    if (err) {
      console.error(err);
      console.log(err);
      // send a helpful error response!
    } else {
      console.log('tag todo');
      res.send('todo tagged');
    }
  })
});

app.delete('/untagTodoItem', (req, res) => {
  const itemId = req.body.id;
  const tagId = req.body.tag_id;
  connectedModel.untagTodoItem(itemId, tagId, (err, result) => {
    if (err) {
      console.error(err);
      console.log(err);
      // send a helpful error response!
    } else {
      console.log('untag todo');
      res.send('todo untagged');
    }
  })
});

app.patch('/markCompleted', (req, res) => {
  const itemId = req.body.id;
  connectedModel.markCompleted(itemId, (err, result) => {
    if (err) {
      console.error(err);
      console.log(err);
      // send a helpful error response!
    } else {
      console.log('mark');
      res.send('todo marked as untagged');
    }
  })
});

const port = 4000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

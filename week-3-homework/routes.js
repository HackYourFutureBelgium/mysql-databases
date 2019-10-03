const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const connectedModel = require('./program.js');
const response = require('./response.js')

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send({ msg: 'hellow!' });
})

app.get('/:id', (req, res) => {
  const id = req.params.id;
  connectedModel.read(id, todo => {
    response.resolve(res, todo);
  })
    .catch(({ message, code }) => {
      response.error(res, message, code);
    });
});

app.post('/', (req, res) => {
  const description = req.body.todo.description;
  const userId = req.body.todo.userId;

  connectedModel.create(description, userId, todo => {
    response.resolve(res, todo);
  })
    .catch(({ message, code }) => {
      response.error(res, message, code);
    });
});

app.patch('/id', (req, res) => {
  const id = req.params.id;
  const description = req.body.todo.description;

  connectedModel.update(id, description, todo => {
    // Pacth return code 'No-content' when the request is processed successfully  
    response.resolve(res, todo, 'No-Content');
  })
    .catch(({ message, code }) => {
      response.error(res, message, code);
    });
});

app.delete('/:id', (req, res) => {
  const id = req.params.id;
  connectedModel.delete(id, () => {
    // Delete return code 'No-content' when the request is processed successfully  
    response.resolve(res, null, 'No-Content');
  })
    .catch(({ message, code }) => {
      response.error(res, message, code);
    });
});

app.post('/:id/tagTodoItem', (req, res) => {
  const itemId = req.params.id;
  const tagId = req.body.todo.tagId;;
  connectedModel.tagTodoItem(itemId, tagId, todo => {
    response.resolve(res, todo);
  })
    .catch(({ message, code }) => {
      response.error(res, message, code);
    });
});

app.delete('/:id/untagTodoItem', (req, res) => {
  const itemId = req.params.id;
  const tagId = req.body.todo.tagId;;
  connectedModel.untagTodoItem(itemId, tagId, todo => {
    // Delete return code 'No-content' when the request is processed successfully  
    response.resolve(res, todo, 'No-Content');
  })
    .catch(({ message, code }) => {
      response.error(res, message, code);
    });
});

app.patch('/:id/markCompleted', (req, res) => {
  const itemId = req.params.id;
  connectedModel.markCompleted(itemId, todo => {
    response.resolve(res, todo);
  })
    .catch(({ message, code }) => {
      response.error(res, message, code);
    });
});

const port = 4000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

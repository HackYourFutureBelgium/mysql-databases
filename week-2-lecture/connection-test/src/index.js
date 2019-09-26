'use strict';

const Express = require('express');
const morgan = require('morgan');

const Db = require('./db');

const PORT = 3000;

const app = new Express();

// Use built-in JSON middleware to automatically parse JSON
app.use(Express.json());

app.use(morgan('dev'));

app.get('/models', (req, res) => {
  Db.query(`select * from models`)
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.status(500)
        .json(err);
    });
});

app.get('/models/:model_name/cars', (req, res) => {
  const modelName = req.params.model_name;

  Db.query(
    `select * from car_names where model = ?`,
    [modelName]
  )
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.status(500)
        .json(err);
    });
});

app.post('/models', (req, res) => {
  const id = req.body.model.id;
  const maker = req.body.model.maker;
  const name = req.body.model.name;
  const s_name = JSON.stringify(name);
  console.log(id, maker, name);

  Db.query(
    `insert into car_makers (id, maker, full_name)
    values (${id}, ${maker}, ${s_name});`
  ).then(Db.query(`select * from car_makers where id = ${id};`))
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.status(500)
        .json(err);
    });
});

async function main() {
  console.log(process.argv);

  await Db.connect();
  console.log('Successfully connected to database');
  console.log('Printing available tables:');

  console.log(await Db.query('show tables'));

  app.listen(PORT, error => {
    if (error) {
      return console.error(error);
    }

    console.log(`Server started on http://localhost:${PORT}`);
  });
}

main()
  .catch(console.error);

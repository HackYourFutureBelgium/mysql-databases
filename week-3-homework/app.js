const express = require('express');
const bodyParser = require('body-parser');
const database = require('./modules/database');
const countryRepo = require('./modules/countryRepository');
const cityRepo = require('./modules/cityRepository');

const app = express();


// Middlewares - routing
app.use(bodyParser.urlencoded({ extended: true })); // ? % & encoded

// use the routers
app.use('/country', require('./routes/country'));
app.use('/user', require('./routes/user'));
app.use('/city', require('./routes/city'));

app.get('/', function (request, response) {
  return response.redirect('/city');
});

app.listen(3000, function () {
  console.log('Running my server in 3000');
});

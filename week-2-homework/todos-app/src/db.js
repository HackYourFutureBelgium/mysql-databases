'use strict';

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'user_todo',
});

function connect() {
  return new Promise((resolve, reject) => {
    connection.connect(err => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
}

function query(queryString, params) {
  return new Promise((resolve, reject) => {
    console.log(queryString, params);

    connection.query(
      {
        sql: queryString,
        values: params,
      },
      function(error, results) {
        if (error) {
          return reject(error);
        }
        resolve(results);
      },
    );
  });
}

module.exports = {
  connect,
  query,
};

'use strict';

const mysql = require('mysql');

const dbConnection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfclass5',
  password: 'hyfpassword',
  database: 'todo_app'
});

function dbQuery(queryString) {
  return new Promise((resolve, reject) => {

    dbConnection.query({
      sql: queryString
    }, (error, results) => {
      if (error) {
        return reject(error);
      }
      resolve(results);
    });
  });
}

module.exports = {
  dbConnection,
  dbQuery
};

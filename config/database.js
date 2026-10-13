const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'cinema_api',
  password: process.env.CINEMA_DB_PASSWORD,
  database: 'cinema',
  port: 3306
});

module.exports = connection;

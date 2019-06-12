'use strict';

var mysql = require('mysql');
var env = require('../config/env.json');

//local mysql db connection
var connection = mysql.createConnection({
  host: env.mysql.host,
  user: env.mysql.user,
  password: env.mysql.password,
  database: env.mysql.database
});

connection.connect(function(err) {
  if (err) throw err;
});

module.exports = connection;

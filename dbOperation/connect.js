const mysql = require('mysql');
const con = mysql.createConnection({

  host: 'localhost',
  user: 'root',
  password: 'mnnit2016',
  database: 'lms'

});

module.exports = con;

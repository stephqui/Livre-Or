let mysql      = require('mysql');
let connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'rrrrr',
  database : 'livreor'
});
 
connection.connect();

module.exports = connection
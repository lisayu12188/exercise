/**
 *数据库连接池模块
 */
const mysql = require('mysql');

var pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'roseonly',
  port: 3306,
  connectionLimit: 5
});

module.exports = pool;

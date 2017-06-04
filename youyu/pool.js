/**
 * Created by yupeiying on 5/10/17.
 */
const mysql = require("mysql");
var pool = mysql.createPool({
    host : "127.0.0.1",
    user : "root",
    password : "root",
    database : "youyu",
    port : 3306,
    connectionLimit: 10
});
module.exports = pool;

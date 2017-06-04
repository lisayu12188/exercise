/**
 * Created by yupeiying on 5/10/17.
 */
const express = require("express") ;
const http = require("http");
var user = require("./user");

var app = express();
http.createServer(app).listen(8080);

//向客户端提供静态资源相应
app.use(express.static("public"));

//向客户端提供动态资源相应
app.post("/user/login",user.login);
app.post("/user/register",user.register);
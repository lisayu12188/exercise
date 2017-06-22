const http = require('http');
const express = require('express');
const pathUtil = require('path');
const fs = require('fs');
// const qs = require('querystring');
const mysql = require ('mysql');
const pool = require ('./pool');
const parseUrl = require('url').parse;
//const ejs = require('ejs');


var app = express();
app.use(express.static(pathUtil.join(__dirname, '../static')));

http.createServer(app).listen(8060);

//定义路由
// app.get('/index', (req, res)=>{
//
//   res.sendFile(__dirname+'../index.html');
// })


//前后端端口不一样，跨域获取文件，对后端响应头作设置
const setCors = function(req,res){
  // 获取请求头url,并解析
  const parsed = parseUrl(req.header('referer') || '');
  if (parsed.host) {
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');
    res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,HEAD');
    res.header('Access-Control-Allow-Origin', `${parsed.protocol}//${parsed.host}`);
  }
};
app.get('/index', (req, res)=>{
  pool.getConnection((err, conn)=>{
    conn.query('SELECT * FROM ro_item',(err, result)=>{
      var roseItems = result;
      setCors(req,res);
      res.json(roseItems); //把指定的对象转换为JSON字符串，并输出给客户端 = JSON.stringify + write + setHeader
      //console.log(dataImg);
      conn.release();
    })
  })
});

app.get('/detail/pid/:pid/cid/:cid', (req, res)=>{
  // var pid = req.params.pid;
  // var cid = req.params.cid;
  // console.log(req.params);
  pool.getConnection((err, conn)=>{
    getData(req, conn).then(data => {
      setCors(req,res);
      res.json(data);
      conn.release();
    });
    // var select1 = `SELECT * FROM ro_color WHERE pid=? And cid=? `;
    // var select2 = `SELECT * FROM rec_item`;
    // var data = [];

    // conn.query(select1,[pid,cid],(err, result)=>{
    //   setCors(req,res);
    //   var cItem = result;
    //   data[0] = cItem
    //   conn.query(select2,(err,result)=>{
    //     setCors(req,res);
    //     var recItem = result;
    //     data[1] = recItem;
    //     res.json(data);
    //     conn.release();
    //   })
    // });
    //
    // // res.json(data);
  })
});


async function getData(req, conn) {
  var pid = req.params.pid;
  var cid = req.params.cid;
  var sql1 = `SELECT * FROM ro_color WHERE pid=? And cid=? `;
  var sql2 = `SELECT * FROM rec_item`;
  var data = [];
  data[0] = await execQuery(conn, sql1, [pid, cid]);
  data[1] = await execQuery(conn, sql2);
  return data;
}


async function execQuery(conn, sql, args = []) {
  return new Promise((resolve, reject) => {
    conn.query(sql, args, (e, result) => {
      e ? reject(e) : resolve(result);
    });
  });
}


// const renderCache = new Map();
// function render(name, data) {
//   let fn = renderCache.get(name);
//   if (!fn) {
//     const path = pathUtil.join(__dirname, '../templates', name);
//     const tpl = fs.readFileSync(path, 'utf-8');
//     fn = ejs.compile(tpl);
//     renderCache.set(name, fn);
//   }
//   return fn(data);
// }











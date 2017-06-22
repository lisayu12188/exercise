/**
 *学生管理相关的模块
 */
const fs = require('fs');
const url = require('url');
const pool = require('./pool');


module.exports = {
  //读取/public/stu/add.html，并返回
  add: function(req, res){
    fs.readFile('./public/stu/add.html',(err,buf)=>{
      res.end(buf);
    });
  },

  //解析出客户端提交请求参数，插入到数据库中，向客户端输出“新记录添加成功”提示
  addDo: function(req, res){
    var objUrl = url.parse( req.url, true );
    //console.log(objUrl.query);
    pool.getConnection((err, conn)=>{
      conn.query('INSERT INTO stu VALUES(NULL,?,?,?)',[objUrl.query.sname, objUrl.query.score, objUrl.query.schoolTime], (err, result)=>{
        res.setHeader('Content-Type','text/html;charset=UTF-8');
        res.end('添加成功！新记录在数据库中的自增编号为：'+result.insertId);
        conn.release();
      });
    });
  },

  //向客户端输出所有的学生信息，以JSON格式
  list: function(req, res){
    pool.getConnection((err, conn)=>{
      conn.query('SELECT * FROM stu',(err,result)=>{  //result: [{},{},{}]
        //把js的数组转换为JSON字符串，输出给客户端
        var str = JSON.stringify(result);
        res.setHeader('Content-Type','application/json;charset=UTF-8');
        res.end(str);
        /*res.setHeader('Content-Type','text/html;charset=UTF-8');
        var html = '<table border="1" width="100%">';
        html+='<tbody>';
        for(var stu of result){
          html += '<tr>';
          html += ` <td>${stu.sid}</td>`;
          html += ` <td>${stu.sname}</td>`;
          html += ` <td>${stu.score}</td>`;
          html += ` <td>${stu.schoolTime}</td>`;
          html += '</tr>';
        }
        html+='</tbody>';
        html+='</table>';
        res.end(html);*/
        conn.release();
      });
    });

  }
}
/**
 * Created by yupeiying on 5/10/17.
 */
const qs = require("querystring");
var pool = require("./pool");

module.exports = {
    register: (req,res)=>{
        req.on("data",(buf)=>{
            var obj = qs.parse(buf.toString());
            console.log(obj);
            pool.getConnection((err,conn)=>{
                conn.query("INSERT INTO user VALUES(?,?,?,'2017-5-9',null)",[obj.uname,obj.uemail,obj.upwd],(err,result)=>{
                    console.log(result);
                    if(result.affectedRows>=1){
                        var output={
                            code:1,
                            msg:"注册成功",
                            uid: result.insertId
                            //uname:result[0].uname,
                            //uemail:result[0].uemail
                        }
                    }else
                    {
                       var output = {
                            code: 2,
                            msg: "注册失败"
                        }
                    }
                    res.json(output);
                    conn.release();
                })
            })
        })

    },
    login: (req,res)=>{
        req.on("data",(buf)=>{
            var obj = qs.parse(buf.toString());
            console.log(obj);
            pool.getConnection((err,conn)=>{
                conn.query("SELECT * FROM user WHERE email=? AND password=?",[obj.uemail, obj.upwd],(err,result)=>{
                    console.log(result);
                    if(result.length>=1){
                        var output={
                            code:1,
                            msg: "登录成功。",
                            name: result[0].username

                        }
                    }else{
                        var output= {
                            code: 2,
                            msg: "登陆失败，请重新登陆。"
                        }
                    }
                    res.json(output);
                    conn.release();

                })
            })
        })

    }
}
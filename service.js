var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
app.use(bodyParser.urlencoded({extended:false}));
const  mysql = require('mysql');
app.use(bodyParser.json());
app.use(cookieParser());
// 解决跨域问题
const conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123',
    database:'mysql'
})
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
    else  next();
});
app.post('/login',function (req,res) {
    name = req.body.name;
    pwd = req.body.pwd;
    console.log(req.body);
    if(name === 'wsj'  && pwd ==='123'){
        res.status(200).send({success:"true", "name" : "name", "pwd" : "pwd","message":"敬请吩咐，主人！"})
    }else {
        res.send({"success":"false","message":"请输入正确的信息"})
    }
});
app.post('/elployment',function (req,res) {
    let sqlStr = `select * from boss where 1 = 1`;
    let arr = [];
    let data = [];
    let pageNum = req.body.pageNum;
    let  pageSizes = req.body.pageSizes;
    if(req.body.name != ""){
        ages = `%${req.body.name}%`;
        sqlStr += " and ages like ? ";
        arr.push(ages)
    }
    let page = pageNum != 1  ? (pageNum -1) * pageSizes  : 0;
    let pages = page + pageSizes;
    sqlStr +=  ` limit ${page},${pages} `;
    conn.query("select count(*) as totle from boss",(err,restotle) => {
        data.push({
            total:restotle
        })
    })
    conn.query(sqlStr,arr,(err,resquest) =>{
        if(err){
            throw  err;
        }else {
            data.push({
                list:resquest
            });
            res.send({success:"true","data":data[1].list,"message":"获取成功",total:data[0].total[0]});
        }
    });

})

var server = app.listen(3000);
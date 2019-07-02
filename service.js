var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cookieParser());
// 解决跨域问题
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
})

var server = app.listen(3000);
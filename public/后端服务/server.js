const express = require("express");
const request = require('request');
const cors = require("cors");
const mysql = require("mysql");
const db = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "root",
  database: "day17"    //数据库的名字
});
const app = express();
app.use(cors());
app.get("/searchAll", (req, res) => {
  console.log(req.query);
  let newsList;
  db.query(`select * from news`, (err, results) => {
    if (err) return console.log(err.message);
    let dataString = JSON.stringify(results);
    let data = JSON.parse(dataString);
    console.log(data);
    newsList = data;
    return res.send(newsList);
  }) 
  
})

app.get("/getNews", (req, res) => {
  let type = req.query.type;
  console.log(type);
  let newsList;
  request(`http://v.juhe.cn/toutiao/index?type=${type}&key=435e4eed530e42de9543dd3e3dca3db9`, function (err, response, body) {
    //err 当前接口请求错误信息
    //response 一般使用statusCode来获取接口的http的执行状态
    //body 当前接口response返回的具体数据 返回的是一个jsonString类型的数据 
    //需要通过JSON.parse(body)来转换
    if (!err && response.statusCode == 200) {
      newsList = JSON.parse(body);
      newsList.result.data.map((item, index) => {
        let uniquekey = item.uniquekey;
        db.query(`select * from news where uniquekey='${item.uniquekey}'`, (err, results) => {
          if (err) return console.log(err.message);
          console.log(results);
          if (results.length === 0) {
            console.log("haha");
            db.query(`insert into news (title, date, category, author_name, url ,uniquekey) 
             values('${item.title}', '${item.date}','${item.category}','${item.author_name}','${item.url}', '${item.uniquekey}')`, (err, results) => {
              console.log(results);
            })
          }
        }) 
      })
      res.send(newsList);
    } else {
      res.send("查询失败");
    }
    console.log(err);
  })
})

app.listen(8080, function () {
  console.log("启动后端服务");
})
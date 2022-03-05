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
app.get("/user", (req, res) => {
  console.log(req.query);
  let fruitsList = [{name: "王二", password: "123"}]
  let usersList;
  let id = 1000000;
  let data = [
    {
      "uniquekey": "0656b4e6f84bcddebd754d5edb7fb322",
      "title": "为躲避交警执法给警车装GPS？海口一男子被行政拘留！",
      "date": "2022-03-05 10:22:00",
      "category": "头条",
      "author_name": "人民资讯",
      "url": "https://mini.eastday.com/mobile/220305102251521708679.html",
      "thumbnail_pic_s": "https://dfzximg02.dftoutiao.com/news/20220305/20220305102251_292f0ed7f114f0a7ec23c97ff10fc09e_1_mwpm_03201609.jpeg",
      "thumbnail_pic_s02": "https://dfzximg02.dftoutiao.com/news/20220305/20220305102251_292f0ed7f114f0a7ec23c97ff10fc09e_2_mwpm_03201609.jpeg",
      "is_content": "1"
    },
    {
      "uniquekey": "6d19c0566e9bc6351413f997546ed7b9",
      "title": "短信显示“医疗账户”已停止？千万别信！",
      "date": "2022-03-05 10:17:00",
      "category": "头条",
      "author_name": "人民资讯",
      "url": "https://mini.eastday.com/mobile/220305101754418535028.html",
      "thumbnail_pic_s": "https://dfzximg02.dftoutiao.com/news/20220305/20220305101754_997ca7003c13194bc085c0d179c36ac9_1_mwpm_03201609.jpeg",
      "thumbnail_pic_s02": "https://dfzximg02.dftoutiao.com/news/20220305/20220305101754_997ca7003c13194bc085c0d179c36ac9_2_mwpm_03201609.jpeg",
      "is_content": "1"
    },
    {
      "uniquekey": "93ba29c935239cf7cb855b1ec0ce2ef4",
      "title": "老人步行27公里迷路，周至民警赶紧联系他的家人",
      "date": "2022-03-05 10:17:00",
      "category": "头条",
      "author_name": "人民资讯",
      "url": "https://mini.eastday.com/mobile/220305101748859291870.html",
      "thumbnail_pic_s": "https://dfzximg02.dftoutiao.com/news/20220305/20220305101748_9b264bd7638dc05dbf6f1b4058c709ad_1_mwpm_03201609.jpeg",
      "thumbnail_pic_s02": "https://dfzximg02.dftoutiao.com/news/20220305/20220305101748_9b264bd7638dc05dbf6f1b4058c709ad_2_mwpm_03201609.jpeg",
      "is_content": "1"
    }
  ]
  // db.query(`select * from ceshi where id=${id}`, (err, results) => {
  //   if (err) return console.log(err.message);
  //   let dataString = JSON.stringify(results);
  //   let data = JSON.parse(dataString);
  //   console.log(data);
  //   usersList = data;
  //   return res.send(usersList);
  // }) 
  data.map((item, index) => {
    db.query(`insert into news (title, date, category, author_name, url ,uniquekey) values
     ('${item.title}', '${item.date}','${item.category}','${item.author_name}','${item.url}', '${item.uniquekey}')`, (err, results) => {
      if (err) console.log(err);
      console.log(results+"插入成功");
    })
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
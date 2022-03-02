const express = require("express");
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
  db.query("select * from ceshi", (err, results) => {
    if (err) return console.log(err.message);
    let dataString = JSON.stringify(results);
    let data = JSON.parse(dataString);
    console.log(data);
    usersList = data;
    return res.send(usersList);
  }) 
})

app.listen(8080, function () {
  console.log("启动后端服务");
})
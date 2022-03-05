import axios from "axios";
import { Input } from 'antd';
import { useState } from "react";
const News = () => {
  let [type, setType] = useState("top")
  const getType = (e) => {
    console.log(e.target.value);
    setType(e.target.value);
  }
  const getNews = () => {
    axios.get(`http://localhost:8080/getNews?type=${type}`).then(
      res => {
        console.log(res);
      }
    ).catch(
      err => {
        console.log(err);
      }
    )
  }

  return (
    <div>
      <h1>新闻数据</h1>
      <Input placeholder="请输入你要查询的新闻类型" onChange={getType} style={{ width: 200 }} />
      <button onClick={getNews}>点击button获取新闻</button>
      <h5>支持类型top(推荐,默认)guonei(国内)guoji(国际)yule(娱乐)tiyu(体育)junshi(军事)keji(科技)caijing(财经)youxi(游戏)qiche(汽车)jiankang(健康)</h5>
    </div>
  )
}

export default News;
import axios from "axios";
import { Input, Button, Checkbox, Modal } from 'antd';
import Nice from "./Nice";
import { useState } from "react";
import  style from './news.css'
const News = () => {
  let [type, setType] = useState("top");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
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
  const searchAll = () => {
    axios.get(`http://localhost:8080/searchAll`).then(
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
      <button className={style.btn} onClick={getNews}>点击button获取新闻</button>
      <button onClick={searchAll}>查询全部新闻存储到数据库里面的</button>
      <h5>支持类型top(推荐,默认)guonei(国内)guoji(国际)yule(娱乐)tiyu(体育)junshi(军事)keji(科技)caijing(财经)youxi(游戏)qiche(汽车)jiankang(健康)</h5>
      <Button>你好</Button>
      <Checkbox />
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
      <Nice />
      <h1 className={style.title}>
        Hello World
      </h1>
    </div>
  )
}

export default News;
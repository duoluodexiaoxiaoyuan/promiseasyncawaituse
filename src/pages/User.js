import { Table, Tag, Space } from 'antd';
import { useEffect, useState } from 'react';
import axios from 'axios';
const User = () => {
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
    },
    {
      title: '内容',
      dataIndex: 'content',
    }
  ]
  let [data, setData] = useState([]);
  let [loading, setLoading] = useState(true);
  let [num, setNum] = useState(1);
  useEffect(() => {
    console.log("hahahaha");
    // axios.get("http://localhost:8080/user").then(
    //   res => {
    //     console.log(res);
    //     setLoading(false);
    //     res.data.map((item, index) => {
    //       item["key"] = index;
    //     });
    //     setData(res.data);
    //   }
    // ).catch(
    //   err => {
    //     console.log(err);
    //   }
    // )
  }, []);
  useEffect(() => {
    console.log("监听num");
  }, [num])
  const add = () => {
    setNum(num+1)
  }
  return (
    <div>
      <button onClick={add}>{num}</button>
      <Table columns={columns} dataSource={data} loading={loading} />
    </div>
    
  )
}

export default User;
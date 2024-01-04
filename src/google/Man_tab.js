import React from 'react'
import '../App.css';
import { AndroidOutlined, AppleOutlined } from '@ant-design/icons';
import { Form, Tabs } from "antd";

import Home from './Home';
import Contron from './Contron';
const Index = () => {
  const add = "add";
  const onChange = (key) => {
    console.log(key);
  };
  const items = [
    {
      key: "1",
      label: (
        <div style={{ textAlign: "center" }}>
          <span>

            <div style={{ fontSize: 15 }}>หน้าแรก</div>
          </span>
        </div>
      ),
      children: <Home/>,
    },
    {
      key: "2",
      label: (
        <div style={{ textAlign: "center" }}>
          <span>
            <div>

              <div style={{ fontSize: 15 }}>ควบคุม</div>
            </div>
          </span>
        </div>
      ),
      children: <Contron/>,
    },
    {
      key: "3",
      label: (
        <div style={{ textAlign: "center" }}>
          <span>

            <div style={{ fontSize: 15 }}>ตั่งค่า</div>
          </span>
        </div>
      ),
      // children: ,
    },
  ];
  return (
    <div className="container" style={{ width: "100%" }}>
      <p
        style={{
          marginBottom: "-5px",
          marginTop: "0px",
          fontSize: "20px",
          textAlign: "center",
          paddingLeft: "10px",

        }}
      >
        MayApp
      </p>
      <div className="Nav-icon">

        <Tabs defaultActiveKey="1"
          centered
          items={items} onChange={onChange} />
      </div>
    </div>

  )
}

export default Index
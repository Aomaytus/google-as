import React from 'react';
import '../App.css';
import { Tabs } from 'antd';
import { HomeOutlined, ControlOutlined, SettingOutlined } from '@ant-design/icons';
import Home from './Home';
import Contron from './Contron';

const { TabPane } = Tabs;

const Index = () => {
  const onChange = (key) => {
    console.log(key);
  };

  const items = [
    {
      key: '1',
      tab: (
        <div className="tab-label">
          <HomeOutlined />
          <span>หน้าแรก</span>
        </div>
      ),
      content: <Home />,
    },
    {
      key: '2',
      tab: (
        <div className="tab-label">
          <ControlOutlined />
          <span>ควบคุม</span>
        </div>
      ),
      content: <Contron />,
    },
    {
      key: '3',
      tab: (
        <div className="tab-label">
          <SettingOutlined />
          <span>ตั้งค่า</span>
        </div>
      ),
      content: /* เพิ่มเนื้อหาของแท็บตั้งค่าที่นี่ */ null,
    },
  ];

  return (
    <div className="container" style={{ width: '100%' }}>
      <p
        className="title"
        style={{
          marginBottom: '15px',
          marginTop: '20px',
          fontSize: '20px',
          textAlign: 'center',
          paddingLeft: '10px',
        }}
      >
        เปิดปิดปั๋มน้ำและปุ๋ยด้วยเสียง
      </p>
      <div className="Nav-icon">
        <Tabs defaultActiveKey="1" centered onChange={onChange}>
          {items.map((item) => (
            <TabPane tab={item.tab} key={item.key}>
              {item.content}
            </TabPane>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default Index;

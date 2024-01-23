import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { ref, onValue, update } from "firebase/database";
import { Button, Checkbox, Form, Input ,Spin } from "antd";
const onFinish = (values) => {
  var wifi = values;
  update(ref(db, "data"), { wifi });
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const Setting = () => {
  const [user_name, setuser_name] = useState("");
  const [usr_password, setuser_password] = useState("");
  useEffect(() => {
    const unsub = onValue(ref(db, "data"), (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // setPump(!!data.Pump);
        setuser_name(data.wifi.wifi_name);
        setuser_password(data.wifi.wifi_password);
        // setHumidity(data.Humm || 0); // Update humidity state

        // If auto mode is enabled, automatically toggle the pump based on humidity
      }
    });
  });
  const [spinning, setSpinning] = React.useState(false);
  const showLoader = () => {
    setSpinning(true);
    setTimeout(() => {
      setSpinning(false);
    }, 3000);
  };
  return (
    <div className="google_tab_body">
    <div> <h3>กำหนดการเชื่อมต่อไวไฟ "ชื่อโปรเจค"</h3></div>
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="ชื่อไวไฟ"
        name="wifi_name"
        rules={[
          {
            required: true,
            message: "Please input your wifi name!",
          },
        ]}
      >
        <Input placeholder={user_name} />
      </Form.Item>

      <Form.Item
        label="รหัสไวไฟ"
        name="wifi_password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input placeholder={usr_password} />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="dashed" htmlType="submit" onClick={showLoader}>
          บันทึก
        </Button>
        <Spin spinning={spinning} fullscreen size="large"  />
        
      </Form.Item>
    </Form>
    </div>
  );
};

export default Setting;

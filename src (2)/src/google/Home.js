import React, { useState, useEffect } from "react";
import {
  Progress,
  Space,
  Modal,
  Button,
  Col,
  InputNumber,
  Row,
  Slider,
} from "antd";
import { db } from "./firebase";
import { ref, onValue } from "firebase/database";
import Sun from "./Sun";

var Temp = 0,
  Humm = 0,
  Lux = 0,
  Fertilizer = 0,
  Pu = 2,
  Pump = 2,
  CurtainStatus = 0;

const Home = () => {
  const [todo, setTodo] = useState();
  const [todos, setTodos] = useState();
  const [PuState, setPuState] = useState();
  const [PumpState, setPumpState] = useState();
  const [CurtainStatusState, setCurtainStatusState] = useState("ปิด"); // Default to 'ปิด'

  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      setTodos([]);
      const data = snapshot.val();
      Temp = data.data.Temp;
      Humm = data.data.Humm;
      Lux = data.data.Lux;
      Fertilizer = data.data.Fertilizer;
      Pu = data.data.Pu;
      if (Pu === 1) {
        setPuState("เปิด");
      } else {
        setPuState("ปิด");
      }
      Pump = data.data.Pump;
      if (Pump === 1) {
        setPumpState("เปิด");
      } else {
        setPumpState("ปิด");
      }
      CurtainStatus = data.data.sun; // Assuming "sun" represents the curtain status
      if (CurtainStatus === 1) {
        setCurtainStatusState("เปิด");
      } else {
        setCurtainStatusState("ปิด");
      }
      if (data !== null) {
        Object.values(data).map((todo) => {
          setTodos((oldArray) => [...oldArray, todo]);
        });
      }
    });
  }, []);

  return (
    <div className='dashboard'>
      <div className="card temperature">
        <div className="card-header">อุณหภูมิ</div>
        <div className="card-body">
          <span>{Temp}</span>°C
        </div>
      </div>

      <div className="card humidity">
        <div className="card-header">ความชื้น</div>
        <div className="card-body">
          <span>{Humm}</span>%
        </div>
      </div>

      <div className="card light-intensity">
        <div className="card-header">ความเข้มแสง</div>
        <div className="card-body">
          <span>{Lux}</span> Lux
        </div>
      </div>

      <div className="card fertilizer">
        <div className="card-header">ค่าปุ๋ย</div>
        <div className="card-body">
          <span>{Fertilizer}</span>%
        </div>
      </div>

      <div className="device-card">
  <div className="device-card-header">การทำงานอุปกรณ์</div>
  <div className="device-card-body">
    <div className="device-status">
      <span className="device-status-label">ปั๊มน้ำ:</span>
      <span className={`device-status-value ${PumpState === "เปิด" ? "green" : "red"}`}>
        {PumpState}
      </span>
    </div>
    <div className="device-status">
      <span className="device-status-label">ให้ปุ๋ย:</span>
      <span className={`device-status-value ${PuState === "เปิด" ? "green" : "red"}`}>
        {PuState}
      </span>
    </div>
    <div className="device-status">
      <span className="device-status-label">ม่านบังแสง:</span>
      <span className={`device-status-value ${CurtainStatusState === "เปิด" ? "green" : "red"}`}>
        {CurtainStatusState}
      </span>
    </div>
    <div className="device-status">
  <span className="device-status-label">ช่วงเวลาเปิดม่านบังแดด:</span>
  <div className="sun-time">
    <span className="sun-icon"><Sun /></span>
  </div>
</div>
  </div>
</div>

</div>

  );
};

export default Home;

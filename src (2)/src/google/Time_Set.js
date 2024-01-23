import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { ref, onValue, update } from "firebase/database";
import { InputNumber, Space, Button } from "antd";
import axios from 'axios';
import Sun from "./Sun";

const Time_Set = () => {
    // ตัวแปรสถานะที่มีอยู่
    const [currentTime, setCurrentTime] = useState(new Date());
    const [HM_ST, setHM_ST] = useState([]);

    // สถานะใหม่เพื่อติดตามสถานะม่าน (เปิด/ปิด)
    const [curtainOpen, setCurtainOpen] = useState(false);

    useEffect(() => {
        // ดึงเวลาปัจจุบันและฟังข้อมูลจาก Firebase
        axios.get("http://worldtimeapi.org/api/ip").then((response) => {
            const { datetime } = response.data;
            setCurrentTime(new Date(datetime));
        });

        onValue(ref(db), (snapshot) => {
            const data = snapshot.val();
            if(data && data.data && data.data.Pump) {
                setHM_ST(data.data.Pump);
            }
        });

    }, []);

    // ฟังก์ชันสำหรับสลับสถานะม่าน
    const toggleCurtain = () => {
        const newCurtainStatus = !curtainOpen;
        setCurtainOpen(newCurtainStatus);
        // อัปเดตสถานะในฐานข้อมูล Firebase
        update(ref(db, `data`), { sun: newCurtainStatus ? 1 : 0 });
    
        // รีเซ็ตเวลาเริ่มต้นและหยุดทำงานเมื่อม่านถูกปิด
        if (!newCurtainStatus) {
            HMStart(0); // รีเซ็ตเวลาเริ่มทำงาน
            MINStart(0); // รีเซ็ตนาทีเริ่มทำงาน
            HMStop(0); // รีเซ็ตเวลาหยุดทำงาน
            MINStop(0); // รีเซ็ตนาทีหยุดทำงาน
        }
    };

    const HMStart = (value) => {
        var HmStart = value;
        update(ref(db, `data`), { HmStart });
        console.log("changed", value);
    };
    const MINStart = (value) => {
        var MinStart = value;
        update(ref(db, `data`), { MinStart });
        console.log("changed", value);
    };
    const HMStop = (value) => {
        var HmStop = value;
        update(ref(db, `data`), { HmStop });
        console.log("changed", value);
    };
    const MINStop = (value) => {
        var MinStop = value;

        update(ref(db, `data`), { MinStop });
        console.log("changed", value);
    };
    return (
        <div className="time-set-container">
        <div className="time-set-header">
          กำหนดช่วงเวลาเปิดปิดม่านบังแดด <Sun />
        </div>
        <Space direction="vertical" size="large" className="time-set-controls">
          {/* ปุ่มสำหรับสลับสถานะม่าน */}
          <Button onClick={toggleCurtain} type="primary" className="button-toggle-curtain">
            {curtainOpen ? 'ปิดม่าน' : 'เปิดม่าน'}
          </Button>
          {/* การแสดงตัวควบคุมเวลาโดยขึ้นอยู่กับสถานะของม่าน */}
          {curtainOpen && (
            <>
              <div className="time-set-control">
                <label>เริ่มทำงาน:</label>
                <InputNumber min={0} max={23} defaultValue={0} onChange={HMStart} />
                <span>:</span>
                <InputNumber min={0} max={59} defaultValue={0} onChange={MINStart} />
              </div>
              <div className="time-set-control">
                <label>หยุดทำงาน:</label>
                <InputNumber min={0} max={23} defaultValue={0} onChange={HMStop} />
                <span>:</span>
                <InputNumber min={0} max={59} defaultValue={0} onChange={MINStop} />
              </div>
            </>
          )}
        </Space>
      </div>
      
    );
};

export default Time_Set;
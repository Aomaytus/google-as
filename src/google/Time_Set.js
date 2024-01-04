import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { set, ref, onValue, update, remove } from "firebase/database";
import { Col, InputNumber, Row, Slider, Space } from "antd";
import axios from 'axios';
import Sun from "./Sun";
const Time_Set = () => {
    const [todos, setTodos] = useState();
    const [todo, setTodo] = useState();
    const [todos2, setTodos2] = useState();
    const [currentTime, setCurrentTime] = useState(new Date());
    const [HM_ST, setHM_ST] = useState([]);
    useEffect(() => {
        // เรียกใช้งาน WorldTimeAPI เพื่อดึงเวลาปัจจุบัน
        axios.get("http://worldtimeapi.org/api/ip").then((response) => {
            const { datetime } = response.data;
            setCurrentTime(new Date(datetime));
        });

        onValue(ref(db), (snapshot) => {
            setTodos([]);
            const data = snapshot.val();
            setHM_ST(data.data.Pump);


            if (data !== null) {
                Object.values(data).map((todo) => {
                    setTodos((oldArray) => [...oldArray, todo]);
                });
            }
        });

    }, []);


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
        <div className="google_tab_body">
            <div className="homhe_bt_one">
                <div>
                    กำหนดช่วงเปิดเปิดม่านบังแดด <Sun/>
                </div>
                <div>
                    <div style={{ margin: "5px 0px", }}>
                        เริ่มทำงาน
                    </div>
                    <InputNumber
                        min={0}
                        max={24}
                        defaultValue={0}
                        prefix="ชั่วโมง:"
                        onChange={HMStart}
                        style={{ marginRight: "10px" }}
                    />
                    :
                    <InputNumber
                        min={0}
                        max={59}
                        defaultValue={0}
                        prefix="นาที:"
                        onChange={MINStart}
                        style={{ marginLeft: "10px" }}
                    />
                    <div
                        style={{
                            margin: "5px 0px",
                        }}
                    >
                        หยุดทำงาน
                    </div>
                    <InputNumber
                        min={0}
                        max={24}
                        defaultValue={0}
                        prefix="ชั่วโมง:"
                        onChange={HMStop}
                        style={{ marginRight: "10px" }}
                    />
                    :
                    <InputNumber
                        min={0}
                        max={59}
                        defaultValue={0}
                        prefix="นาที:"
                        onChange={MINStop}
                        style={{ marginLeft: "10px" }}
                    />
                </div>
            </div>
        </div>
    )
}

export default Time_Set
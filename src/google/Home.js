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
import { set, ref, onValue, update, remove } from "firebase/database";
import Sun from "./Sun";
var Temp = 0, Humm = 0, Lux = 0, Fertilizer = 0, Pu = 2, Pump = 2;
const Home = () => {
    const [todo, setTodo] = useState();
    const [todos, setTodos] = useState();
    const [PuState, setPuState] = useState();
    const [PumpState, setPumpState] = useState();
    useEffect(() => {
        onValue(ref(db), (snapshot) => {
            setTodos([]);
            const data = snapshot.val();
            Temp = data.data.Temp;
            Humm = data.data.Humm;
            Lux = data.data.Lux;
            Fertilizer = data.data.Fertilizer;
            Pu = data.data.Pu;
            if (Pu == 1) {
                setPuState("เปิด");
            }
            else { setPuState("ปิด"); }
            Pump = data.data.Pump;
            if (Pump == true) {
                setPumpState("เปิด");
            }
            else { setPumpState("ปิด"); }
            if (data !== null) {
                Object.values(data).map((todo) => {
                    setTodos((oldArray) => [...oldArray, todo]);
                });
            }
        });
    }, []);
    return (
        <div className='google_tab_body'>

            <div className="homhe_bt_one">
                <div>ค่าจากซนเซอร์</div>
                <div>อุณหภูมิ {Temp} C</div>
                <div>ความชื้น {Humm} %</div>
                <div>ความเข้มแสง {Lux} Lux</div>
                <div>ค่าปุ๋ย {Fertilizer} %</div>
            </div>
            <div className="homhe_bt_one">
                <div>การทำงานอุปกรณ์</div>
                <div> ปั๊มน้ำ {PumpState} </div>
                <div>ให้ปุ๋ย {PuState}</div>
            <div>ช่วงเวลาเปิดม่านบังแดด</div>
                <div><Sun/></div>
            </div>

        </div>



    )
}

export default Home
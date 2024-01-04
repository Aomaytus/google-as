import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { set, ref, onValue, update, remove } from "firebase/database";
import {
    Switch,
} from "antd";
const Io = () => {
    const [todo, setTodo] = useState();
    const [todos, setTodos] = useState();
    const [Pump, setPump] = useState();
    const [Pu, setPu] = useState();
    useEffect(() => {
        onValue(ref(db), (snapshot) => {
            setTodos([]);
            const data = snapshot.val();
            var ST_Pump = data.data.Pump;

            if (ST_Pump == 1) {
                setPump(true);
            } else {
                setPump(false);
            }
            var ST_Pu = data.data.Pu;
            if (ST_Pu == 1) {
                setPu(true);
            } else {
                setPu(false);
            }
            if (data !== null) {
                Object.values(data).map((todo) => {
                    setTodos((oldArray) => [...oldArray, todo]);
                });
            }
        });
    }, []);

    const State_Pump = (checked) => {
        var Pump;
        if (checked == true) { Pump = 1; }
        else { Pump = 0; }
        update(ref(db, `data`), {
            Pump,
        });
    };
    const State_Pu = (checked) => {
        var Pu;
        if (checked == true) { Pu = 1; }
        else { Pu = 0; }
        update(ref(db, `data`), {
            Pu,
        });
    };
    return (
        <div className="google_tab_body">
            <div className="homhe_bt_one">
                <div>
                    <div> ปั๊มน้ำ</div>
                    <Switch checked={Pump} onChange={State_Pump} />
                </div>
                <div>
                    <div>ให้ปุ๋ย</div>
                    <Switch checked={Pu} onChange={State_Pu} />
                </div>
            </div>
        </div>
    )
}

export default Io
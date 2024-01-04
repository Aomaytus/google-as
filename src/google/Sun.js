import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { set, ref, onValue, update, remove } from "firebase/database";
import {
    Switch,
} from "antd";
var  HmStart ;
var  MinStart ;
var  HmStop ;
var  MinStop ;
const Sun = () => {
    const [todo, setTodo] = useState();
    const [todos, setTodos] = useState();
    const [Pump, setPump] = useState();
    const [Pu, setPu] = useState();
    useEffect(() => {
        onValue(ref(db), (snapshot) => {
            setTodos([]);
            const data = snapshot.val();
            HmStart = data.data.HmStart;
            MinStart = data.data.MinStart;
            HmStop = data.data.HmStop;
            MinStop = data.data.MinStop;
            if (data !== null) {
                Object.values(data).map((todo) => {
                    setTodos((oldArray) => [...oldArray, todo]);
                });
            }
        });
    }, []);
    return (
        <div>
            <div>
                {HmStart}:{MinStart}  ถึง {HmStop}:{MinStop}   น.
            </div>

        </div>
    )
}

export default Sun
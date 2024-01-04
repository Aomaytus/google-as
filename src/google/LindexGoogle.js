import React from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import {
  AudioOutlined,
  AudioMutedOutlined
} from '@ant-design/icons';
import '../App.css';
import { db } from "./firebase";
import { set, ref, onValue, update, remove } from "firebase/database";

const LindexGoogle = () => {
  const commands = [
    {
      command: "",
      callback: ({ resetTranscript }) => {
        SpeechRecognition.stopListening(); // หยุดการฟังเสียงก่อน
        resetTranscript();
        console.log("no data");
      },
    },
  ];

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition({ commands, language: 'th-TH' });
  var value = transcript;
  console.log(value);
  if (value == "เปิดปั๊มน้ำ") {
    var Pump = 1;
    update(ref(db, `data`), {
      Pump,
    });
  }
  if (value == "ปิดปั๊มน้ำ") {
    var Pump = 0;
    update(ref(db, `data`), {
      Pump,
    });
  }
  if (value == "เปิดการให้ปุ๋ย") {
    var Pu = true;
    update(ref(db, `data`), {
      Pu,
    });
  }
  if (value == "ปิดการให้ปุ๋ย") {
    var Pu = false;
    update(ref(db, `data`), {
      Pu,
    });
  }
  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true, language: 'th-TH' });

  };
  const stopListening = () => {
    SpeechRecognition.stopListening(); // หยุดการฟังเสียงก่อน
    resetTranscript();
  };
  return (
    <div className="google_tab_body">
      <div>Microphone {listening ? "on" : "off"} </div>
      <div className="tex_microphon">
        {transcript}
      </div>
      <AudioOutlined
       onClick={startListening} 
       className="mi_bt"
       style={{
        fontSize: '30px',
      }}
       >{listening}</AudioOutlined>
      < AudioMutedOutlined 
      onClick={stopListening} 
      className="mi_bt"
      style={{
        fontSize: '30px',
      }}
      >{listening} </AudioMutedOutlined>
      {/* <button onClick={startListening}>{listening ? "on" : "off"}</button> */}
    </div>
  );
};

export default LindexGoogle;

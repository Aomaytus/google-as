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
  if (value == "เปิดปั๊มปุ๋ย") {
    var Pu = 1;
    update(ref(db, `data`), {
      Pu,
    });
  }
  if (value == "ปิดปั๊มปุ๋ย") {
    var Pu = 0;
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
    SpeechRecognition.stopListening();
    resetTranscript();
  };

  return (
    <div className="google_tab_body">
      <div className="mic-button-container">
        <AudioOutlined onClick={startListening} className="mic-button">
          {listening ? "on" : "off"}
        </AudioOutlined>
      </div>
      <div className="status-text">Microphone {listening ? "on" : "off"} </div>
      <div className="text-microphone">
        {transcript}
      </div>
      <div className="buttons-container">
        <AudioOutlined onClick={startListening} className="mi_bt">{listening}</AudioOutlined>
        <AudioMutedOutlined onClick={stopListening} className="mi_bt">{listening}</AudioMutedOutlined>
      </div>
    </div>
  );
};

export default LindexGoogle;/*12665865996525*/ 

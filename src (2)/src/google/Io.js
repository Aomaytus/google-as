import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { ref, onValue, update } from 'firebase/database';
import { Switch, Modal, Spin, InputNumber } from 'antd';

const Io = () => {
  const [Pump, setPump] = useState(false);
  const [Pu, setPu] = useState(false); // State for fertilizer pump
  const [Humidity, setHumidity] = useState(0); // State for humidity
  const [LowerHumidityThreshold, setLowerHumidityThreshold] = useState(40); // State for lower humidity threshold to turn pump on
  const [UpperHumidityThreshold, setUpperHumidityThreshold] = useState(60); // State for upper humidity threshold to turn pump off
  const [AutoMode, setAutoMode] = useState(false); // State for auto mode
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsub = onValue(ref(db, 'data'), (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setPump(!!data.Pump);
        setPu(!!data.Pu);
        setHumidity(data.Humm || 0); // Update humidity state

        // If auto mode is enabled, automatically toggle the pump based on humidity
        if (AutoMode) {
          if (data.Humm < LowerHumidityThreshold && !Pump) {
            updateDeviceState('Pump', true);
          } else if (data.Humm > UpperHumidityThreshold && Pump) {
            updateDeviceState('Pump', false);
          }
        }
      }
    });

    // Unsubscribe from the listener when unmounting
    return () => unsub();
  }, [AutoMode, LowerHumidityThreshold, UpperHumidityThreshold]); // Re-run effect if any of the dependencies change

  useEffect(() => {
    // Check if AutoMode is enabled when any of the threshold values change
    if (AutoMode) {
      // If humidity is below LowerHumidityThreshold and pump is off, turn on the pump
      if (Humidity < LowerHumidityThreshold && !Pump) {
        updateDeviceState('Pump', true);
      }
      // If humidity is above UpperHumidityThreshold and pump is on, turn off the pump
      else if (Humidity > UpperHumidityThreshold && Pump) {
        updateDeviceState('Pump', false);
      }
    }
  }, [AutoMode, LowerHumidityThreshold, UpperHumidityThreshold, Humidity, Pump]);

  const updateDeviceState = (device, state) => {
    setLoading(true);
    update(ref(db, 'data'), { [device]: state ? 1 : 0 })
      .then(() => {
        setLoading(false);
        if(device === 'Pump') setPump(state);
        if(device === 'Pu') setPu(state); // Update state for fertilizer pump
      })
      .catch((error) => {
        setLoading(false);
        console.error('Firebase update failed:', error);
      });
  };

  const handleSwitchChange = (device, checked) => {
    Modal.confirm({
      title: `คุณแน่ใจหรือไม่ว่าคุณต้องการ ${checked ? 'เปิดใช้งาน' : 'ปิดใช้งาน'} ${
        device === 'Pump' ? 'ปั๊มน้ำ' : 'ปั๊มปุ๋ย'
      }?`,
      onOk: () => {
        updateDeviceState(device, checked);
        // Disable auto mode when manually toggling the pump
        if(device === 'Pump') {
          setAutoMode(false);
        }
      },
    });
  };

  return (
    <div className="google_tab_body">
      <Spin spinning={loading}>
        <div className="home_bt_one">
          <div>
            <div>ปั๊มน้ำ</div>
            <Switch checked={Pump} onChange={(checked) => handleSwitchChange('Pump', checked)} />
          </div>
          <div>
            <div>ปั๊มปุ๋ย</div>
            <Switch checked={Pu} onChange={(checked) => handleSwitchChange('Pu', checked)} />
          </div>
        </div>
        <div class="custom-container">
  <div class="current-humidity">ความชื้นปัจจุบัน: {Humidity}%</div>
  <div class="config-box">ตั้งค่าความชื้นสำหรับเปิดปั๊มน้ำ:
    <InputNumber min={0} max={100} value={LowerHumidityThreshold} onChange={setLowerHumidityThreshold} />
  </div>
  <div class="config-box">ตั้งค่าความชื้นสำหรับปิดปั๊มน้ำ:
    <InputNumber min={0} max={100} value={UpperHumidityThreshold} onChange={setUpperHumidityThreshold} />
  </div>
  <div class="config-box">
    <Switch checked={AutoMode} onChange={setAutoMode} />โหมดเปิดน้ำอัตโนมัติ
  </div>
</div>

      </Spin>
    </div>
  );
};

export default Io;

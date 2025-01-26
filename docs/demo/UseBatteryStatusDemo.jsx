import { useBatteryStatus } from 'react-haiku';
import React from 'react';
import './styling/demo.css';

export const UseBatteryStatusDemo = () => {
  const {level, isCharging} = useBatteryStatus();
  
  return (
      <div className="demo-container-center">
        <b style={{ "marginBottom": "1em" }}>Battery Status!</b>
          <p style={{ "marginBottom": "0" }}>Battery Level: <span style={{"color": "#E46B39"}}>{level}</span></p>
          <p style={{ "marginBottom": "0" }}>Is Battery Charging: <span style={{"color": "#E46B39"}}>{isCharging ? "True" : "False"}</span></p>
      </div>
  );
}
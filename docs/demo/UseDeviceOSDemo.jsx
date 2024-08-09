import { useDeviceOS } from 'react-haiku';
import React from 'react';
import './demo.css';

export const UseDeviceOSDemo = () => {
  const deviceOS = useDeviceOS();

  return (
      <div className="demo-container-center">
        <b style={{ "marginBottom": "1em" }}>Check Your Device OS!</b>
          <p style={{ "marginBottom": "0" }}>Operating System: <span style={{"color": "#E46B39"}}>{deviceOS}</span></p>
      </div>
  );
}
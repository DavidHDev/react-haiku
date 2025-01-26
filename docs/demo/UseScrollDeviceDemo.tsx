import { useScrollDevice } from 'react-haiku';
import React from 'react';
import './styling/demo.css';

export const UseScrollDeviceDemo = () => {
  const device = useScrollDevice();

  return (
    <div className="demo-container-center">
      <h3 style={{ marginBottom: '1em' }}>Scroll Detection:</h3>

      <div
        className="demo-button bounceIn"
        style={{
          fontSize: '1.4rem',
          borderColor: device ? '#ff8000' : '#555',
          color: device ? '#ff8000' : '#888',
        }}
      >
        {device?.toUpperCase() || 'SCROLL TO DETECT'}
      </div>

      <div
        style={{
          padding: '0 4em',
          marginTop: '2em',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1em',
          width: '100%',
        }}
      >
        <div className="demo-device-indicator">
          <div className={`device-dot ${device === 'mouse' ? 'active' : ''}`} />
          <span>Mouse Wheel</span>
        </div>

        <div className="demo-device-indicator">
          <div
            className={`device-dot ${device === 'trackpad' ? 'active' : ''}`}
          />
          <span>Trackpad</span>
        </div>
      </div>

      <p
        style={{
          marginTop: '2em',
          fontSize: '0.85em',
          color: '#888',
          textAlign: 'center',
        }}
      >
        Scroll vertically to detect input device
      </p>
    </div>
  );
};

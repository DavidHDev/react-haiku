import { useNetwork } from 'react-haiku';
import React from 'react';

export const UseNetworkDemo = () => {
  const isOnline = useNetwork();

  return (
    <div className="demo-container-center">
      <h3 style={{ marginBottom: '1em' }}>Network Status:</h3>
      <div
        className={`demo-button ${
          isOnline ? 'green-button' : 'red-button'
        } bounceIn`}
      >
        {isOnline ? 'ONLINE' : 'OFFLINE'}
      </div>
      <p
        style={{
          marginTop: '1.5em',
          fontSize: '0.85em',
          color: '#888',
          textAlign: 'center',
          maxWidth: '300px',
        }}
      >
        Toggle network status in Chrome DevTools (Application → Service Workers
        → Offline)
      </p>
    </div>
  );
};

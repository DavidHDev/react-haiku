import { useState } from 'react';
import { useInterval } from 'react-haiku';
import React from 'react';

export const UseIntervalDemo = () => {
  const [count, setCount] = useState(0);
  const { start, stop } = useInterval(() => {
    setCount((c) => c + 1);
  }, 1000);

  const handleRestart = () => {
    stop();
    setTimeout(() => {
      setCount(0);
      start(1000);
    }, 50);
  };

  return (
    <div className="demo-container-center">
      <h3 style={{ marginBottom: '1em' }}>Interval Counter:</h3>
      <div
        className="demo-button green-button bounceIn"
        style={{ fontSize: '2em' }}
      >
        {count}
      </div>

      <div style={{ marginTop: '1.5em', display: 'flex', gap: '1em' }}>
        <button className="demo-button red-button" onClick={stop}>
          Stop
        </button>
        <button className="demo-button green-button" onClick={handleRestart}>
          Restart
        </button>
      </div>

      <p
        style={{
          marginTop: '1.5em',
          fontSize: '0.85em',
          color: '#888',
          textAlign: 'center',
        }}
      >
        Restart will reset counter and interval
      </p>
    </div>
  );
};

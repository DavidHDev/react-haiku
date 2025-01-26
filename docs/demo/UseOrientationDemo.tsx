import React from 'react';
import { useOrientation } from 'react-haiku';

export const UseOrientationDemo = () => {
  const orientation = useOrientation();

  return (
    <div className="demo-container-center">
      <h3>Current Orientation:</h3>
      <div
        style={{ padding: '1em', borderRadius: '15px' }}
        className={
          orientation === 'portrait'
            ? 'green-button'
            : 'red-button'
        }
      >
        {orientation.toUpperCase()}
      </div>
    </div>
  );
};

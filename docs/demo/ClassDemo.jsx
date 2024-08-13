import React, { useState } from 'react';
import { Class } from 'react-haiku';
import './demo.css';

export const ClassDemo = () => {
  const [isActive, setIsActive] = React.useState(false);
  const ref = React.useRef(null);

  const toggleActive = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="demo-container-center">
      <button onClick={toggleActive} className="toggle-button" ref={ref}>
        Toggle Active State
      </button>
      <Class
        className="base-class"
        condition={isActive}
        toggleClass="active-class"
      >
        <p>This div will toggle between base-class and active-class.</p>
      </Class>
    </div>
  );
};

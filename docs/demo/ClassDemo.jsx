import React from 'react';
import { Class } from 'react-haiku';
import './demo.css';

export const ClassDemo = () => {
  const [isActive, setIsActive] = React.useState(false);


  return (
    <div className="demo-container-center">
      <button className="demo-button" onClick={() => setIsActive(!isActive)}>
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

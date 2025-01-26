import React from 'react';
import { Class } from 'react-haiku';

export const ClassDemo = () => {
  const [isActive, setIsActive] = React.useState(false);

  return (
    <div className="demo-container-center">
      <button
        className="demo-button"
        onClick={() => setIsActive(!isActive)}
        style={{ marginBottom: '1em' }}
      >
        {isActive ? 'Remove Active class' : 'Add Active class'}
      </button>
      <Class
        className="base-class"
        condition={isActive}
        toggleClass="active-class"
        as={'section'}
      >
        This is a Class component
      </Class>
    </div>
  );
};

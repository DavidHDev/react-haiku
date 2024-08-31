import React from 'react';
import { usePreventBodyScroll } from 'react-haiku';
import './demo.css';

export const UsePreventBodyScrollDemo = () => {
  const { isScrollLocked, toggleScrollLock } = usePreventBodyScroll();

  return (
    <div className="demo-container-center">
      <b style={{ marginBottom: '1em' }}>
        Scroll: {isScrollLocked ? 'Disabled' : 'Enabled'}
      </b>
      <button className="demo-button" onClick={toggleScrollLock}>
        Toggle Scroll!
      </button>
    </div>
  );
};

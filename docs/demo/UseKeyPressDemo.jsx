import { useKeyPress } from 'react-haiku';
import React, { useState } from 'react';

export const UseKeyPressDemo = () => {
  const [didKeyPress, setDidKeyPress] = useState(false);
  useKeyPress(['Control', 'Shift', 'A'], (e) => {
    setDidKeyPress(true);
  });

  return (
    <div className="demo-container-center">
      <p >Press Control + Shift + A</p>
      {didKeyPress && <p>{`You pressed : Control + Shift + A`}</p>}
    </div>
  );
};

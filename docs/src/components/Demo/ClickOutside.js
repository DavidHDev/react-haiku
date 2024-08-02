import React from 'react';
import { useClickOutside } from "react-haiku"

export const ClickOutside = () => {
  const [count, setCount] = React.useState(0);
  const ref = React.useRef(null)

  const handleClickOutside = () => setCount(count + 1);

  useClickOutside(ref, handleClickOutside);

  return (
    <div ref={ref} className='click-outside'>
      Clicked outside of this slide <span>{count}</span> time{count === 1 ? '' : 's'}!
    </div>
  );
}
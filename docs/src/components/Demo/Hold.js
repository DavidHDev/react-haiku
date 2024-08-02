import React from 'react';
import { useHold } from "react-haiku"

export const Hold = () => {
  const [count, setCount] = React.useState(0)
  const [holdText, setHoldText] = React.useState('Press & Hold!');
  const handleHold = () => {
    setCount(count + 1);
    setHoldText('Let go!');

    setTimeout(() => {
      setHoldText('Press & Hold!')
    }, 1000)
  }

  const buttonHold = useHold(handleHold, { delay: 2000 });

  return (
    <div className='demo-hold'>
      Successfully held<span>{count}</span>time{count === 1 ? '' : 's'}!<br />
      <button {...buttonHold}>
        {holdText}
      </button>
    </div>
  );
}
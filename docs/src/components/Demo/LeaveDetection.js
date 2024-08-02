import { useLeaveDetection } from 'react-haiku';
import React from 'react';

export const LeaveDetection = () => {
  const [leaveCount, setLeaveCount] = React.useState(0);
  useLeaveDetection(() => setLeaveCount((s) => s + 1));

  return (
    <div className='mouse-leave'>
      Your mouse left the viewport <span>{leaveCount}</span> time{leaveCount === 1 ? '' : 's'}!
    </div>
  );
}
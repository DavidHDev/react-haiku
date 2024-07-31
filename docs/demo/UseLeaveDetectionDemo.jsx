import { useLeaveDetection } from "react-haiku"
import React from 'react';
import './demo.css';

export const UseLeaveDetectionDemo = () => {
    const [leaveCount, setLeaveCount] = React.useState(0);
    useLeaveDetection(() => setLeaveCount((s) => s + 1));

    return (
        <div className="demo-container-center">
            <button className="demo-button">
                {`You have left the page ${leaveCount} times!`}
            </button>
        </div>
    );
}
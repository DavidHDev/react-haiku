import { useUpdateEffect } from "react-haiku";
import React from 'react';
import './demo.css';

export const UseUpdateEffectDemo = () => {
    const [count, setCount] = React.useState(0);
    const [triggerCount, setTriggerCount] = React.useState(0);

    useUpdateEffect(() => {
        setTriggerCount(triggerCount + 1);
    }, [count]) // no dependency array needed

    return (
        <div className="demo-container-center">
            <b style={{ "marginBottom": "1em" }}>Updates Detected: {triggerCount}</b>
            <button onClick={() => setCount(count + 1)} className="demo-button">Update State</button>
        </div>
    );
}

import { useHold } from "react-haiku"
import React from 'react';
import './demo.css';

export const UseHoldDemo = () => {
    const [count, setCount] = React.useState(0)
    const handleHold = () => setCount(count + 1);

    const buttonHold = useHold(handleHold, { delay: 2000 });

    return (
        <div className="demo-container-center">
            <b style={{"marginBottom": "1em"}}>Successful Holds: {count}</b>
            <button className="demo-button" {...buttonHold}>
                Press & Hold!
            </button>
        </div>
    );
}
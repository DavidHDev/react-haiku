import { useUrgentUpdate } from "react-haiku"
import React from 'react';
import './demo.css';

export const UseUrgentUpdateDemo = () => {
    const update = useUrgentUpdate();
    const randomNo = Math.floor(Math.random() * 100);

    return (
        <div className="demo-container-center">
            <b style={{"marginBottom": "1em"}}>{`Number: ${randomNo}`}</b>
            <button className="demo-button" onClick={update}>Force Render</button>
        </div>
    );
}
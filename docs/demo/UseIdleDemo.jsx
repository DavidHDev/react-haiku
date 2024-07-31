import { useIdle } from "react-haiku";
import React from 'react';
import './demo.css';

export const UseIdleDemo = () => {
    const idle = useIdle(3000);

    return (
        <div className="demo-container-center">
            <b>Current Status: {idle ? 'Idle' : 'Active'}</b>
        </div>
    );
}

export const UseIdleCustomDemo = () => {
    const idle = useIdle(1000, { events: ['click', 'touchstart'], initialState: false });

    return (
        <div className="demo-container-center">
            <b>Works only with click/touch events!</b>
            <b>Current Status: {idle ? 'Idle' : 'Active'}</b>
        </div>
    );
}
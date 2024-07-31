import { useScrollPosition } from "react-haiku";
import React from 'react';
import './demo.css';

export const UseScrollPositionDemo = () => {
    const [scroll, setScroll] = useScrollPosition();

    return (
        <div className="demo-container-center">
            <b style={{ "marginBottom": "1em" }}>Current Position: {`X: ${scroll.x}, Y: ${scroll.y}`}!</b>
            <button onClick={() => setScroll({ y: document.body.scrollHeight })} className="demo-button">Scroll To Bottom</button>
        </div>
    );
}
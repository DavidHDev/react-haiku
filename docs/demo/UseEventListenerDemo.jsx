
import { useEventListener } from "react-haiku";
import React from 'react';
import './demo.css';

export const UseEventListenerDemo = () => {
    const [countWindow, setCountWindow] = React.useState(0);
    const [countRef, setCountRef] = React.useState(0);

    // Button Ref
    const buttonRef = React.useRef(null)

    // Event Handlers
    const countW = () => setCountWindow(countWindow + 1);
    const countR = () => setCountRef(countRef + 1);

    // Example 1: Window Event
    useEventListener('scroll', countW);

    // Example 2: Element Event
    useEventListener('click', countR, buttonRef);

    return (
        <div className="demo-container-center">
            <b>Window Event Triggered {countWindow} Times!</b>
            <b style={{"marginBottom": '1em'}}>Ref Event Triggered {countRef} Times!</b>
            <button className="demo-button" ref={buttonRef}>Click Me</button>
        </div>
    );
}
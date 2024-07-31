
import { useClickOutside } from "react-haiku";
import React from 'react';
import './demo.css';

export const UseClickOutsideDemo = () => {
    const [count, setCount] = React.useState(0);
    const ref = React.useRef(null)

    const handleClickOutside = () => setCount(count + 1);

    useClickOutside(ref, handleClickOutside);

    return (
        <div className="demo-container-center">
            <b style={{ "marginBottom": '1em' }}>Clicked Outside {count} Times!</b>
            <button className="demo-button" ref={ref}>Click Outside Of Me!</button>
        </div>
    );
}
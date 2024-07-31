import { If } from "react-haiku"
import React from 'react';
import './demo.css';

export const IfDemo = () => {
    const [number, setNumber] = React.useState(6);

    return(
        <div className="demo-container-center">
            <b style={{"marginBottom": "1em"}}>Click to update state!</b>
            <If isTrue={number === 6}>
                <button className="demo-button" onClick={() => setNumber(7)}>I like the number 6!</button>
            </If>
            <If isTrue={number === 7}>
                <button className="demo-button" onClick={() => setNumber(6)}>7 is way better!</button>
            </If>
        </div>
    );
}
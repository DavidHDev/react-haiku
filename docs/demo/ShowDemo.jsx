import { Show } from "react-haiku"
import React from 'react';
import './demo.css';

export const ShowDemo = () => {
    const [number, setNumber] = React.useState(6);

    return (
        <div className="demo-container-center">
            <Show>
                <Show.When isTrue={number === 6}>
                    <b style={{ "marginBottom": "1em" }}>Number is 6!</b>
                    <button className="demo-button" onClick={() => setNumber(number + 1)}>Increment</button>
                </Show.When>
                <Show.When isTrue={number === 7}>
                    <b style={{ "marginBottom": "1em" }}>Number is 7!</b>
                    <button className="demo-button" onClick={() => setNumber(number + 1)}>Increment</button>
                </Show.When>
                <Show.Else>
                    <b style={{ "marginBottom": "1em" }}>No valid number found!</b>
                    <button className="demo-button" onClick={() => setNumber(6)}>Reset</button>
                </Show.Else>
            </Show>
        </div>
    );
}
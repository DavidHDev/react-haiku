import { useInputValue } from "react-haiku"
import React from 'react';
import './demo.css';

export const UseInputValueDemo = () => {
    const [nameValue, setNameValue] = useInputValue('');

    return (
        <div className="demo-container-start">
            <input
                placeholder="Type something.."
                type="text" value={nameValue}
                onChange={setNameValue}
            />
            <p>{`Value - ${nameValue ? nameValue : 'None'}`}</p>
        </div>
    );
}
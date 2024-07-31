import { useToggle } from "react-haiku"
import React from 'react';
import './demo.css';

export const UseToggleDemo = () => {
    const [theme, toggleTheme] = useToggle('dark', ['dark', 'light']);

    return (
        <div className="demo-container-center">
            <b style={{"marginBottom": "1em"}}>{`Theme: ${theme}`}</b>
            <button className="demo-button" onClick={() => toggleTheme()}>Toggle!</button>
        </div>
    );
}
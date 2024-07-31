import { useScript } from "react-haiku"
import React from 'react';
import './demo.css';

export const UseScriptDemo = () => {
    const script = useScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.10.4/gsap.min.js');

    return (
        <div className="demo-container-center">
            <b style={{"marginBottom": "1em"}}>Check the bottom of the body tag!</b>
            <button className="demo-button">
                {`Script Status: ${script}`}
            </button>
        </div>
    );
}
import { useMediaQuery } from "react-haiku"
import React from 'react';
import './demo.css';

export const UseMediaQueryDemo = () => {
    const breakpoint = useMediaQuery('(max-width: 1200px)');

    return (
        <div className="demo-container-center">
            <p>Resize your window!</p>
            <button className={breakpoint ? 'demo-button green-button' : 'demo-button red-button'}>
                {breakpoint ? "It's a match for 1200px!" : "Not a match for 1200px!"}
            </button>
        </div>
    );
}
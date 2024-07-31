import { useHover } from "react-haiku"
import React from 'react';
import './demo.css';

export const UseHoverDemo = () => {
    const { hovered, ref } = useHover();

    return(
        <div className="demo-container-center">
            <button className="demo-button" ref={ref}>
                {hovered ? 'All mice on me!' : 'No mice on me!'}
            </button>
        </div>
    );
}
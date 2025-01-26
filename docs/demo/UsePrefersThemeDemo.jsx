import { usePrefersTheme } from "react-haiku"
import React from 'react';
import './styling/demo.css';

export const UsePrefersThemeDemo = () => {
    const theme = usePrefersTheme();

    return (
        <div className="demo-container-center">
            <button className="demo-button">
                {
                    `You prefer the ${theme} theme,
                    ${theme === 'light' ? 'ew!' : 'great!'}`
                }
            </button>
        </div>
    );
}

import { useFavicon } from "react-haiku";
import React from 'react';
import './demo.css';

export const UseFaviconDemo = () => {
    const { setFavicon } = useFavicon();

    return (
        <div className="demo-container-center">
            <button className="demo-button" onClick={() => setFavicon('https://bit.ly/3NEz8Sj')}>Update Favicon</button>
        </div>
    );
}
import { useClipboard } from "react-haiku"
import React from 'react';
import './demo.css';

export const UseClipboardDemo = () => {
    const clipboard = useClipboard({ timeout: 2000 });

    return(
        <div className="demo-container-center">
            <button className="demo-button" onClick={() => clipboard.copy('Haiku Rocks!')}>
                {clipboard.copied ? 'Copied' : 'Copy'}
            </button>
        </div>
    );
}
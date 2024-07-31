import { RenderAfter } from "react-haiku"
import React from 'react';
import './demo.css';

export const RenderAfterDemo = () => {
    return (
        <div className="demo-container-center">
            <RenderAfter delay={5000}>
                <b>Wait 5 seconds and I'll show up!</b>
            </RenderAfter>
        </div>
    );
}
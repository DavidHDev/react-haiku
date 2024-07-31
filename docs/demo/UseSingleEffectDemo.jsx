import { useSingleEffect } from "react-haiku";
import React from 'react';
import './demo.css';

export const UseSingleEffectDemo = () => {
    const [renderCount, setRenderCount] = React.useState(0);

    useSingleEffect(() => {
        setRenderCount(renderCount + 1);
    }) // no dependency array needed

    return (
        <div className="demo-container-center">
            <b>Effect executed only {renderCount} time!</b>
        </div>
    );
}
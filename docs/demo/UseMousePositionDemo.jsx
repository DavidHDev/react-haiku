import { useMousePosition } from "react-haiku"
import React from 'react';
import './demo.css';

export const UseMousePositionDemo = () => {
    const { target, x, y } = useMousePosition();

    return (
        <div className="demo-container-center" ref={target}>
            <b>Hover This Container</b>
            <p>{`X: ${x} | Y: ${y}`}</p>
        </div>
    );
}

export const UseMousePositionFullDemo = () => {
    const { x, y } = useMousePosition();

    return (
        <div className="demo-container-center">
            <p>{`X: ${x} | Y: ${y}`}</p>
        </div>
    );
}
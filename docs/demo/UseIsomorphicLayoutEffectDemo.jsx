import { useIsomorphicLayoutEffect } from "react-haiku";
import React from 'react';
import './styling/demo.css';

export const UseIsomorphicLayoutEffectDemo = () => {
    useIsomorphicLayoutEffect(() => {
        // do whatever
    }, [])

    return (
        <div className="demo-container-center">
            <b>SSR will run useEffect</b>
            <b>Browser will run useLayoutEffect</b>
        </div>
    );
}
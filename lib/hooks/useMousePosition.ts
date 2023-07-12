import { useEffect, useRef, useState } from 'react';

export function useMousePosition() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const { max } = Math;
    const target = useRef();

    const setMousePosition = (event) => {
        if (target.current) {
            const r = event.currentTarget.getBoundingClientRect();
            const x = max(0, Math.round(event.pageX - r.left - (window.pageXOffset || window.scrollX)));
            const y = max(0, Math.round(event.pageY - r.top - (window.pageYOffset || window.scrollY)));
            setPosition({ x, y });
        } else setPosition({ x: event.clientX, y: event.clientY });
    };

    useEffect(() => {
        const element = target?.current ? target.current : document;
        element.addEventListener('mousemove', setMousePosition);

        return () => element.removeEventListener('mousemove', setMousePosition);
    }, [target.current]);

    return { target, ...position };
}
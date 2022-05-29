import { useState, useEffect, useRef } from 'react';

const defaultEvents = ['keypress', 'mousemove', 'touchmove', 'click', 'scroll'];
const defaultOptions = {
    events: defaultEvents,
    initialState: true,
};

export function useIdle(timeout, options) {
    const { events, initialState } = { ...defaultOptions, ...options };
    const [idle, setIdle] = useState(initialState);
    const timer = useRef();

    useEffect(() => {
        const handleEvents = () => {
            setIdle(false);

            if (timer.current) window.clearTimeout(timer.current);
            timer.current = window.setTimeout(() => setIdle(true), timeout);
        };

        events.forEach((event) => document.addEventListener(event, handleEvents));
        return () => events.forEach((event) => document.removeEventListener(event, handleEvents));
    }, [timeout]);

    return idle;
}
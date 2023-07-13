import { useState, useEffect, useRef } from 'react';

const defaultEvents = ['keypress', 'mousemove', 'touchmove', 'click', 'scroll'] as const;
type DefaultEvent = typeof defaultEvents[number];
type Options = {
    events?: DefaultEvent[];
    initialState?: boolean;
}
const defaultOptions: Options = {
    events: [...defaultEvents],
    initialState: true,
};

export function useIdle(timeout: number, options: Options = {}) {
    const { events, initialState }: Options = { ...defaultOptions, ...options };
    const [idle, setIdle] = useState(initialState);
    const timer = useRef<number | undefined>(undefined);

    useEffect(() => {
        const handleEvents = () => {
            setIdle(false);

            if (timer.current) window.clearTimeout(timer.current);
            timer.current = window.setTimeout(() => setIdle(true), timeout);
        };

        events?.forEach((event) => document.addEventListener(event, handleEvents));
        return () => events?.forEach((event) => document.removeEventListener(event, handleEvents));
    }, [timeout]);

    return idle;
};

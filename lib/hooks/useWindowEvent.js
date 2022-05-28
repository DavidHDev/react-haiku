import { useEffect } from 'react';

export function useWindowEvent(type, listener, options) {
    useEffect(() => {
        window.addEventListener(type, listener, options);
        return () => window.removeEventListener(type, listener, options);
    }, []);
}
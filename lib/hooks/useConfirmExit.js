import { useCallback, useEffect } from 'react';

const on = (obj, ...args) => {
    if (obj && obj.addEventListener) obj.addEventListener(...(args));
}

const off = (obj, ...args) => {
    if (obj && obj.removeEventListener) obj.removeEventListener(...(args));
}

export function useConfirmExit(enabled, message = 'Are you sure you want to exit?') {
    const handler = useCallback((e) => {
        const finalEnabled = typeof enabled === 'function' ? enabled() : true;
        if (!finalEnabled) return;
        e.preventDefault();

        if (message) e.returnValue = message;

        return message;
    }, [enabled, message]);

    useEffect(() => {
        if (!enabled) return;
        on(window, 'beforeunload', handler);

        return () => off(window, 'beforeunload', handler);
    }, [enabled, handler]);
};
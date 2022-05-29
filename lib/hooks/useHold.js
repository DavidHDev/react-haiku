import { useCallback, useRef } from 'react';

const isTouchEvent = (e) => 'touches' in e;

const on = (obj, ...args) => {
    if (obj && obj.addEventListener) obj.addEventListener(...(args));
}

const off = (obj, ...args) => {
    if (obj && obj.removeEventListener) obj.removeEventListener(...(args));
}

const preventDefault = (e) => {
    if (!isTouchEvent(e)) return;
    if (e.touches.length < 2 && e.preventDefault) e.preventDefault();
};

export const useHold = (callback, { doPreventDefault = true, delay = 1000 } = {}) => {
    const timeout = useRef();
    const target = useRef();

    const start = useCallback((event) => {
        if (doPreventDefault && event.target) {
            on(event.target, 'touchend', preventDefault, { passive: false });
            target.current = event.target;
        }
        timeout.current = setTimeout(() => callback(event), delay);
    }, [callback, delay, doPreventDefault]);

    const clear = useCallback(() => {
        timeout.current && clearTimeout(timeout.current);
        if (doPreventDefault && target.current) off(target.current, 'touchend', preventDefault);
    }, [doPreventDefault]);

    return {
        onMouseDown: (e) => start(e),
        onTouchStart: (e) => start(e),
        onMouseUp: clear,
        onMouseLeave: clear,
        onTouchEnd: clear,
    };
};

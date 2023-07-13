import { off, on } from 'lib/helpers/event';
import { type MouseEvent, useCallback, useRef, type TouchEvent } from 'react';
type EventType = MouseEvent | TouchEvent;
const isTouchEvent = (e: EventType): e is TouchEvent => 'touches' in e;

const preventDefault = (e: EventType) => {
    if (!isTouchEvent(e)) return;
    if (e.touches.length < 2 && e.preventDefault) e.preventDefault();
};

export const useHold = (callback: (e: EventType) => any, { doPreventDefault = true, delay = 1000 } = {}) => {
    const timeout = useRef<number | undefined>();
    const target = useRef<EventTarget | undefined>();

    const start = useCallback((event: EventType) => {
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
        onMouseDown: (e: MouseEvent) => start(e),
        onTouchStart: (e: TouchEvent) => start(e),
        onMouseUp: clear,
        onMouseLeave: clear,
        onTouchEnd: clear,
    };
};

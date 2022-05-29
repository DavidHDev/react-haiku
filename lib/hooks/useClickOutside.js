import { useEventListener } from './useEventListener';

export function useClickOutside(ref, handler, events = ['mousedown', 'touchstart']) {
    events.forEach((event) => {
        useEventListener(event, event => {
            const el = ref?.current;
            if (!el || el.contains(event.target)) return;

            handler(event);
        })
    })
}
import { useEventListener } from './useEventListener';

export function useClickOutside(ref, handler, event = ['mousedown']) {
    useEventListener(event, event => {
        const el = ref?.current;
        if (!el || el.contains(event.target)) return;

        handler(event);
    })
}
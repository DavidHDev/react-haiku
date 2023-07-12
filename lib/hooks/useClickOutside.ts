import React from 'react';
import { useEventListener } from './useEventListener';

export function useClickOutside(ref: React.RefObject<any>, handler: (e: Event) => any, event = 'mousedown') {
    useEventListener(event, (event) => {
        const el = ref?.current;
        if (!el || el.contains(event.target)) return;

        handler(event);
    });
};

import { useState } from 'react';

export function useToggle<T>(initialValue: T, options: [T, T]) {
    const [state, setState] = useState(initialValue);
    const handleToggle = () => setState((current) => current === options[0] ? options[1] : options[0]);

    const toggle = (value:T) => typeof value !== 'undefined' ? setState(value) : handleToggle();
    return [state, toggle];
}

export function useBoolToggle(initialValue = false) {
    return useToggle(initialValue, [true, false]);
}
import { useReducer } from 'react';
const r = (v) => (v + 1) % 1000000;

export function useUrgentUpdate() {
    const [_, u] = useReducer(r, 0);
    return u;
}

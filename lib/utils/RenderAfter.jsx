import { useEffect, useState } from 'react';

export function RenderAfter({ delay = 1000, children }) {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setReady(true), delay)
        return () => clearTimeout(timer);
    }, [ready])

    return ready ? children : null;
}
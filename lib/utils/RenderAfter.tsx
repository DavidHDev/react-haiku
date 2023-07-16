import { type ReactNode, useEffect, useState } from 'react';

export function RenderAfter({ delay = 1000, children }: {
    delay?: number;
    children: ReactNode;
}) {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setReady(true), delay)
        return () => clearTimeout(timer);
    }, [ready])

    return ready ? children : null;
}

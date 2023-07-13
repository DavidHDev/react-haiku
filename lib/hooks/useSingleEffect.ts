import { useEffect, useRef } from 'react';

export function useSingleEffect(effect: any) {
    const destroy = useRef();
    const calledOnce = useRef(false);
    const renderAfterCalled = useRef(false);

    if (calledOnce.current) renderAfterCalled.current = true;

    useEffect(() => {
        if (calledOnce.current) return;

        calledOnce.current = true;
        destroy.current = effect();

        return () => {
            if (!renderAfterCalled.current) return;
            // @ts-ignore
            if (destroy.current) destroy.current()
        };
    }, []);
};

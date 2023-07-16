import { useEffect } from 'react'

import { useFirstRender } from './useFirstRender';

export function useUpdateEffect(
    effect: (() => void | (() => void | undefined)),
    deps: ReadonlyArray<any>) {
    const isFirstRender = useFirstRender();

    useEffect(() => {
        if (!isFirstRender) return effect()
    }, deps);
}
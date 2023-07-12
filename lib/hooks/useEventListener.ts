import { useEffect, useRef } from 'react'
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect'

export function useEventListener(eventName, handler, element) {
    const savedHandler = useRef(handler)

    useIsomorphicLayoutEffect(() => {
        savedHandler.current = handler
    }, [handler])

    useEffect(() => {
        const targetElement = element?.current || window
        if (!(targetElement && targetElement.addEventListener)) return;

        const eventListener = event => savedHandler.current(event)
        targetElement.addEventListener(eventName, eventListener)

        return () => {
            targetElement.removeEventListener(eventName, eventListener)
        }
    }, [eventName, element])
}
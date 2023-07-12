// Hook
import { useRef } from 'react'

export function useFirstRender() {
    const isFirst = useRef(true)

    if (isFirst.current) {
        isFirst.current = false
        return true
    }

    return isFirst.current
}
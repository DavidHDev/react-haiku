import { useCallback, useEffect, useRef, useState } from 'react'
import { useEventListener } from './useEventListener';

export function useLocalStorage(key, initialValue) {
    const readValue = useCallback(() => {
        if (typeof window === 'undefined') return initialValue

        try {
            const item = window.localStorage.getItem(key)
            return item ? (parseJSON(item)) : initialValue
        } catch (error) {
            console.error(`Error getting storage key “${key}”:`, error)
            return initialValue
        }
    }, [initialValue, key])

    const [storedValue, setStoredValue] = useState(readValue)
    const setValueRef = useRef()

    setValueRef.current = value => {
        try {
            const newValue = value instanceof Function ? value(storedValue) : value
            window.localStorage.setItem(key, JSON.stringify(newValue))

            setStoredValue(newValue)
            window.dispatchEvent(new Event('local-storage'))
        } catch (error) {
            console.warn(`Error adding "${key}" to storage:`, error)
        }
    }

    const setValue = useCallback(value => setValueRef.current?.(value), []);

    useEffect(() => {
        setStoredValue(readValue())
    }, [])

    const handleStorageChange = useCallback(() => setStoredValue(readValue()), [readValue]);
    useEventListener('storage', handleStorageChange)
    useEventListener('local-storage', handleStorageChange)
    return [storedValue, setValue]
}

function parseJSON(value) {
    try {
        return value === 'undefined' ? undefined : JSON.parse(value ?? '')
    } catch {
        return undefined
    }
}
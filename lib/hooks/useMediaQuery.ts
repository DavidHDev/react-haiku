import { useState, useEffect, useRef } from 'react';

function attachMediaListener(
  query: any,
  callback: (event: MediaQueryListEvent) => any,
) {
  try {
    query.addEventListener('change', callback);

    return () => query.removeEventListener('change', callback);
  } catch (e) {
    query.addListener(callback);

    return () => query.removeListener(callback);
  }
}

function computeInitialValue<T>(query: string, initialValue: T) {
  if (initialValue !== undefined) {
    return initialValue;
  }

  if (typeof window !== 'undefined' && 'matchMedia' in window) {
    return window.matchMedia(query).matches;
  }

  return false;
}

export function useMediaQuery<T>(query: string, initialValue: T) {
  const [matches, setMatches] = useState(
    computeInitialValue(query, initialValue),
  );
  const ref = useRef<MediaQueryList | undefined>();

  useEffect(() => {
    if ('matchMedia' in window) {
      ref.current = window.matchMedia(query);
      setMatches(ref.current.matches);
      return attachMediaListener(ref.current, (event: MediaQueryListEvent) =>
        setMatches(event.matches),
      );
    }

    return undefined;
  }, [query]);

  return matches;
}

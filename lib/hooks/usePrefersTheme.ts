import { useMediaQuery } from './useMediaQuery';

export function usePrefersTheme(initialValue: 'light' | 'dark') {
  return useMediaQuery('(prefers-color-scheme: dark)', initialValue === 'dark')
    ? 'dark'
    : 'light';
}

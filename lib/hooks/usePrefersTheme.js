import { useMediaQuery } from './useMediaQuery';

export function usePrefersTheme(initialValue) {
  return useMediaQuery('(prefers-color-scheme: dark)', initialValue === 'dark') ? 'dark' : 'light';
}
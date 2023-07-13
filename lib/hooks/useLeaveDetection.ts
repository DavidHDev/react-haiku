import { useEffect } from 'react';

export function useLeaveDetection(onLeave: (this: HTMLElement, ev: MouseEvent) => any) {
  useEffect(() => {
    document.documentElement.addEventListener('mouseleave', onLeave);
    return () => document.documentElement.removeEventListener('mouseleave', onLeave);
  }, []);
};

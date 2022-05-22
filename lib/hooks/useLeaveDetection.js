import { useEffect } from 'react';

export function useLeaveDetection(onLeave) {
  useEffect(() => {
    document.documentElement.addEventListener('mouseleave', onLeave);
    return () => document.documentElement.removeEventListener('mouseleave', onLeave);
  }, []);
}
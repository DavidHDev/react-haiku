import { useState, useCallback } from 'react';
import { useEventListener } from './useEventListener';

export function useNetwork() {
  const [isOnline, setIsOnline] = useState<boolean>(navigator?.onLine || true);

  const handleOnline = useCallback(() => {
    setIsOnline(true);
  }, []);

  const handleOffline = useCallback(() => {
    setIsOnline(false);
  }, []);

  useEventListener('online', handleOnline);
  useEventListener('offline', handleOffline);

  return isOnline;
}

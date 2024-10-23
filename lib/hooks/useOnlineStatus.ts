import { useEffect, useState } from 'react';

export function useOnlineStatus() {
  const [onlineStatus, setOnlineStatus] = useState({
    isOnline: navigator.onLine,
  });

  useEffect(() => {
    // Function to handle status change
    const handleOnlineStatusChange = () => {
      setOnlineStatus({
        isOnline: navigator.onLine,
      });
    };

    // Add event listeners for online and offline events
    window.addEventListener('online', handleOnlineStatusChange);
    window.addEventListener('offline', handleOnlineStatusChange);

    // Cleanup event listeners on unmount
    return () => {
      window.removeEventListener('online', handleOnlineStatusChange);
      window.removeEventListener('offline', handleOnlineStatusChange);
    };
  }, []);

  return onlineStatus;
}

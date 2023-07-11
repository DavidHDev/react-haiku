import { useState, useEffect, useCallback } from 'react';

export function useFullscreen(targetRef) {
  const [isFullscreen, setFullscreen] = useState(false);

  const toggleFullscreen = useCallback(() => {
    if (isFullscreen) {
      switch (true) {
        case 'exitFullscreen' in document:
          document.exitFullscreen();
          break;
        case 'mozCancelFullScreen' in document:
          document.mozCancelFullScreen();
          break;
        case 'webkitExitFullscreen' in document:
          document.webkitExitFullscreen();
          break;
        case 'msExitFullscreen' in document:
          document.msExitFullscreen();
          break;
        default:
          console.log('Fullscreen API is not supported.');
          break;
      }
    } else {
      if (targetRef.current) {
        switch (true) {
          case 'requestFullscreen' in targetRef.current:
            targetRef.current.requestFullscreen();
            break;
          case 'mozRequestFullScreen' in targetRef.current:
            targetRef.current.mozRequestFullScreen();
            break;
          case 'webkitRequestFullscreen' in targetRef.current:
            targetRef.current.webkitRequestFullscreen();
            break;
          case 'msRequestFullscreen' in targetRef.current:
            targetRef.current.msRequestFullscreen();
            break;
          default:
            console.log('Fullscreen API is not supported.');
            break;
        }
      }
    }

    setFullscreen(prevState => !prevState);
  }, [isFullscreen, targetRef]);

  const handleFullscreenChange = useCallback(() => {
    setFullscreen(!!document.fullscreenElement);
  }, []);

  useEffect(() => {
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [handleFullscreenChange]);

  return { isFullscreen, toggleFullscreen };
}
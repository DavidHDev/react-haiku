import React, { useState, useEffect, useCallback } from 'react';

type DocumentWith<T> = Document & T;

export function useFullscreen(targetRef: React.MutableRefObject<Document & {} | any>) {
  const [isFullscreen, setFullscreen] = useState(false);

  const toggleFullscreen = useCallback(() => {
    if (isFullscreen) {
      switch (true) {
        case 'exitFullscreen' in document:
          document.exitFullscreen();
          break;
        case 'mozCancelFullScreen' in document:
          (document as DocumentWith<{
            mozCancelFullScreen: () => void;
          }>).mozCancelFullScreen();
          break;
        case 'webkitExitFullscreen' in document:
          (document as DocumentWith<{
            webkitExitFullscreen: () => void;
          }>).webkitExitFullscreen();
          break;
        case 'msExitFullscreen' in document:
          (document as DocumentWith<{
            msExitFullscreen: () => void;
          }>).msExitFullscreen();
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
};

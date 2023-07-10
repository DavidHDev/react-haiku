import React, { useState, useEffect } from 'react';

function useFullscreen(targetRef) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const openFullscreen = () => {
    if (targetRef.current) {
      if (targetRef.current.requestFullscreen) {
        targetRef.current.requestFullscreen();
      } else if (targetRef.current.mozRequestFullScreen) { /* Firefox */
        targetRef.current.mozRequestFullScreen();
      } else if (targetRef.current.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        targetRef.current.webkitRequestFullscreen();
      } else if (targetRef.current.msRequestFullscreen) { /* IE/Edge */
        targetRef.current.msRequestFullscreen();
      }
    }
  };

  const closeFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  };

  const handleFullscreenChange = () => {
    setIsFullscreen(!!document.fullscreenElement);
  };

  useEffect(() => {
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  return { isFullscreen, openFullscreen, closeFullscreen };
}

export default useFullscreen;

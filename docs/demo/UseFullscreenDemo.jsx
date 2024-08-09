import { useFullscreen } from 'react-haiku'
import React from 'react'
import './demo.css';

export const UseFullscreenDemo = () => {
  const documentRef = React.useRef(null);

  React.useEffect(() => {
    documentRef.current = document.documentElement;
  }, []);

  const {isFullscreen, toggleFullscreen } = useFullscreen(documentRef);
  return (
      <div className="demo-container-center">
        <b style={{"marginBottom": "1em"}}>Is in Fullscreen Mode: <span style={{"color": "#E46B39"}}>{isFullscreen ? "True" : "False"}</span></b>
        <button className='demo-button' onClick={toggleFullscreen}>Toggle Fullscreen!</button>
      </div>
  );
}

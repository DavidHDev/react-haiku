import { useWindowSize } from 'react-haiku';
import React from 'react';

export const UseWindowSizeDemo = () => {
  const {height, width} = useWindowSize();
    return (
        <div className="demo-container-center">
          <b style={{ "marginBottom": "1em" }}>Resize Your Window!</b>
           <p style={{ "marginBottom": "0" }}>Window Height: <span style={{"color": "#E46B39"}}>{height}</span></p>
           <p style={{ "marginBottom": "0" }}>Window Width: <span style={{"color": "#E46B39"}}>{width}</span></p>
        </div>
    );
}
import { useSize} from "react-haiku"
import React from 'react';

export const UseSizeDemo = () => {
  const elementRef = React.useRef(null);
  const { width, height } = useSize(elementRef);
    return (
        <div className="demo-container-center">
          <b style={{ "marginBottom": "1em", "marginTop": "1.5em" }}>Resize Me!</b>
          <div
            ref={elementRef}
            style={{
              "resize": "both",
              "overflow": "auto",
              "padding": "1em",
              "border": "1px solid #ccc",
              "width": "200px",
              "height": "200px",
              "marginBottom": "2em",
              "border": "solid #E46B39",
            }}
          >
            <p style={{ "marginBottom": "0" }}>Width: <span style={{"color": "#E46B39"}}>{width}</span>px</p>
            <p style={{ "marginBottom": "0" }}>Height: <span style={{"color": "#E46B39"}}>{height}</span>px</p>
          </div>
        </div>
    );
}
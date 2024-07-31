
import React from 'react';
import './demo.css';

/* The functionality in this demo had to be emulated due to Docusaurus re-rendering 
my Demo component multiple times and not allowing the showcase of the hook */

export const UseFirstRenderDemo = () => {
    const [isFirst, setFirst] = React.useState(true);

    return (
        <div className="demo-container-center">
            <b style={{"marginBottom": "1em"}}>First Render? - {isFirst ? 'Yes' : 'No'}</b>
            <button className="demo-button" onClick={() => setFirst(false)}>
                Trigger Re-Render
            </button>
        </div>
    );
}
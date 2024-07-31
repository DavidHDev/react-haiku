
import { useConfirmExit, useBoolToggle } from "react-haiku"
import React from 'react';
import './demo.css';

export const UseConfirmExitDemo = () => {
    const [dirty, toggleDirty] = useBoolToggle();
    useConfirmExit(dirty);

    return (
        <div className="demo-container-center">
            <b>Try to close this tab with the window dirty!</b>
            <p style={{"marginBottom": '1em'}}>Dirty: {`${dirty}`}</p>
            <button className='demo-button' onClick={() => toggleDirty()}>{dirty ? 'Set Clean' : 'Set Dirty'}</button>
        </div>
    );
}
import { useTitle } from "react-haiku"
import React from 'react';

export const UseTitleDemo = () => {
    const [title, setTitle] = React.useState('');
    useTitle(title);

    return (
        <div className="demo-container-center">
            <button className='demo-button' onClick={() => setTitle('It works!')}>Update Title</button>
        </div>
    );
}
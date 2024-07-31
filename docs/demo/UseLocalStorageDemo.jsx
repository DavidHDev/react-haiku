
import { useLocalStorage } from "react-haiku";
import React from 'react';
import './demo.css';

export const UseLocalStorageDemo = () => {
    const [value, setValue] = useLocalStorage('message');

    React.useEffect(() => {
        setValue({ message: 'Hello!' })
    }, [])

    return (
        <div className="demo-container-center">
            <b style={{ "marginBottom": '1em' }}>Storage Value: {value?.message}</b>
            <button className="demo-button" onClick={() => setValue({ message: 'Woah!' })}>Update Storage</button>
        </div>
    );
}
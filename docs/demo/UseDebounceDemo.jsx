
import { useDebounce } from "react-haiku"
import React from 'react';
import './demo.css';

export const UseDebounceDemo = () => {
    const [value, setValue] = React.useState('')
    const debouncedValue = useDebounce(value, 1000)

    const handleChange = (event) => setValue(event.target.value)

    React.useEffect(() => {
        console.log(debouncedValue);
    }, [debouncedValue])

    return (
        <div className="demo-container-start">
            <b>Real-Time Value: {value}</b>
            <b style={{"marginBottom": '1em'}}>Debounced value: {debouncedValue}</b>

            <input type="text" value={value} onChange={handleChange} />
        </div>
    );
}
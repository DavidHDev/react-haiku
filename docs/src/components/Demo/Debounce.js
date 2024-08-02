import React from 'react';
import { useDebounce } from "react-haiku"

export const Debounce = () => {
  const [value, setValue] = React.useState('')
  const debouncedValue = useDebounce(value, 1000)

  const handleChange = (event) => setValue(event.target.value)

  return (
    <div>
      <div className='demo-debounce'>
        Realtime Value:<span>{value}</span><br />
        Debounce value:<span>{debouncedValue}</span>
      </div>

      <input className='debounce-input' maxLength={15} placeholder='Type something!' type="text" value={value} onChange={handleChange} />
    </div>
  );
}
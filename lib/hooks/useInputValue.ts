import { useState } from 'react';

export function handleChange<T>(setValue: React.Dispatch<any>) {
  return (val: T) => {
    if (!val) {
      setValue(val);
    } else if (typeof val === 'object' && 'nativeEvent' in val) {
      // @ts-ignore
      const { currentTarget } = val;

      if (currentTarget.type === 'checkbox') {
        setValue(currentTarget.checked);
      } else {
        setValue(currentTarget.value);
      }
    } else {
      setValue(val);
    }
  };
}

export function useInputValue<T>(initialState: T) {
  const [value, setValue] = useState<T>(initialState);

  return [value, handleChange<T>(setValue)] as const;
}

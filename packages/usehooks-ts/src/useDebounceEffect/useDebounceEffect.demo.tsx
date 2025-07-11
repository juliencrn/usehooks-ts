import { useState } from 'react';
import { useDebounceEffect } from './useDebounceEffect'

export default function Component() {
  const [value, setValue] = useState(0);

  useDebounceEffect(() => {
    console.log('Debounced effect executed with value:', value);
  }, [value], 1000);

  return <div>
    <h1>useDebounceEffect Demo</h1>
    <p>Current value: {value}</p>
    <button onClick={() => setValue(value + 1)}>Increment</button>
    <button onClick={() => setValue(value - 1)}>Decrement</button>
  </div>
}

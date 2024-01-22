Returns a debounced version of the provided value, along with a function to update it.

### Parameters

- `value`: The value to be debounced.
- `delay`: The delay in milliseconds before the value is updated.
- `options` (optional): Optional configurations for the debouncing behavior.
  - `leading` (optional): Determines if the debounced function should be invoked on the leading edge of the timeout.
  - `trailing` (optional): Determines if the debounced function should be invoked on the trailing edge of the timeout.
  - `maxWait` (optional): The maximum time the debounced function is allowed to be delayed before it's invoked.
  - `equalityFn` (optional): A custom equality function to compare the current and previous values.

### Returns

An array containing the debounced value and the function to update it.

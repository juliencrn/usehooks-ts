Creates a debounced version of a callback function.

### Parameters

- `func`: The callback function to be debounced.
- `delay` (optional): The delay in milliseconds before the callback is invoked (default is 500 milliseconds).
- `options` (optional): Options to control the behavior of the debounced function.

### Returns

A debounced version of the original callback along with control functions.

### Dependency

This hook is built upon [`lodash.debounce`](https://www.npmjs.com/package/lodash.debounce).

### Related hooks

- [`useDebounceValue`](/react-hook/use-debounce-value): Built on top of `useDebounceCallback`, it returns the debounce value instead

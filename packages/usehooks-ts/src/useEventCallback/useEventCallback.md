The `useEventCallback` hook is a utility for creating memoized event callback functions in React applications. It ensures that the provided callback function is memoized and stable across renders, while also preventing its invocation during the render phase.

See: [How to read an often-changing value from useCallback?](https://legacy.reactjs.org/docs/hooks-faq.html#how-to-read-an-often-changing-value-from-usecallback)

### Parameters

- `fn: (args) => result` - The callback function to be memoized.

### Return Value

- `(args) => result` - A memoized event callback function.

### Features

- **Memoization**: Optimizes performance by memoizing the callback function to avoid unnecessary re-renders.
- **Prevents Invocation During Render**: Ensures the callback isn't called during rendering, preventing potential issues.
- **Error Handling**: Throws an error if the callback is mistakenly invoked during rendering.
- **Strict Mode Compatibility**: Works seamlessly with React's strict mode for better debugging and reliability.

### Notes

Avoid using `useEventCallback` for callback functions that depend on frequently changing state or props.

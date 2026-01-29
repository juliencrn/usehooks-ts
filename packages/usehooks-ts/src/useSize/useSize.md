A React hook that tracks the dimensions (width and height) of an element with debounced updates.

This hook combines `useResizeObserver` and `useDebounceCallback` to provide an ergonomic way to track element size changes without triggering excessive re-renders.

### Parameters

- `frequency`: The debounce delay in milliseconds. Controls how often size updates trigger re-renders. (default is `200`)

### Returns

An object containing:

- `ref`: A React ref that should be attached to the element you want to observe.
- `width`: The current width of the element in pixels.
- `height`: The current height of the element in pixels.

### Features

- Automatically tracks element size changes using ResizeObserver
- Debounces updates to prevent excessive re-renders during continuous resize events
- Provides a simple ref-based API for easy integration
- TypeScript support with proper type inference

### Use Cases

- Responsive layouts that need to adapt based on container size
- Charts and visualizations that need to resize with their container
- Virtual scrolling implementations
- Dynamic font sizing based on container dimensions
- Any UI component that needs to respond to size changes

Related hooks:

- [`useResizeObserver()`](/react-hook/use-resize-observer)
- [`useDebounceCallback()`](/react-hook/use-debounce-callback)

A React hook for observing the size of an element using the [ResizeObserver API](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver).

### Parameters

- `ref`: The ref of the element to observe.
- `onResize`: When using `onResize`, the hook doesn't re-render on element size changes; it delegates handling to the provided callback. (default is `undefined`).
- `box`: The box model to use for the ResizeObserver. (default is `'content-box'`)

### Returns

- An object with the `width` and `height` of the element if the `onResize` optional callback is not provided.

### Polyfill

The `useResizeObserver` hook does not provide polyfill to give you control, but it's recommended. You can add it by re-exporting the hook like this:

```ts
// useResizeObserver.ts
import { ResizeObserver } from '@juggle/resize-observer'
import { useResizeObserver } from 'usehooks-ts'

if (!window.ResizeObserver) {
  window.ResizeObserver = ResizeObserver
}

export { useResizeObserver }
```

Easily retrieve media dimensions with this Hook React which also works onResize.

**Note:**

- If you use this hook in an SSR context, set the `initializeWithValue` option to `false`.
- Before Safari 14, `MediaQueryList` is based on `EventTarget` and only supports `addListener`/`removeListener` for media queries. If you don't support these versions you may remove these checks. Read more about this on [MDN](https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList/addListener).

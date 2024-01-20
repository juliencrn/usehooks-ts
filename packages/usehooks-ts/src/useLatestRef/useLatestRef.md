Returns a ref that contains the latest ("fresh") version of a value. This can be used to access the latest value inside an event handler or `useEffect()` without adding the value to a dependency array.

Because this hook updates the ref in a `useEffect()`, the ref value may be "stale" when accessed inside a `useLayoutEffect()`. For this, use [`useLayoutLatestRef()`](/react-hook/use-layout-latest-ref) instead.

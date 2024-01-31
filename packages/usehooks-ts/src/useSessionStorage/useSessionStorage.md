Persist the state with session storage so that it remains after a page refresh. This can be useful to record session information. This hook is used in the same way as useState except that you must pass the storage key in the 1st parameter. If the window object is not present (as in SSR), `useSessionStorage()` will return the default value.

You can also pass an optional third parameter to use a custom serializer/deserializer.

**Note**: If you use this hook in an SSR context, set the `initializeWithValue` option to `false`.

Related hooks:

- [`useLocalStorage()`](/react-hook/use-local-storage)

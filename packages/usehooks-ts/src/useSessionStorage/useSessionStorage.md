Persist the state with session storage so that it remains after a page refresh. This can be useful to record session information. This hook is used in the same way as useState except that you must pass the storage key in the 1st parameter. If the window object is not present (as in SSR) or the storage key does not exist, `useSessionStorage()` will return the default value provided.

**Options:**

There is some additional config you can pass to this hook with a third, `options` argument:

- `parseAsJson: boolean` - defaults to `true`. If you have a previously set session storage value that you don't want to parse using `JSON.parse`, you can set this to `false`
- `parser: (value: string | null) => T` - a custom parser if you have stored a session storage value with a custom serializer function
- `serializer: (value: T) => string` - a custom serializer to store values in a format different from the default behavior of `JSON.stringify`

Related hooks:

- [`useReadSessionStorage()`](/react-hook/use-read-session-storage)
- [`useLocalStorage()`](/react-hook/use-local-storage)

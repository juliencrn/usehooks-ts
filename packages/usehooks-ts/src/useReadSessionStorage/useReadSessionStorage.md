This React Hook allows you to read a value from session storage by its key. It can be useful if you just want to read without passing a default value.
If the window object is not present (as in SSR) or if the value doesn't exist, `useReadSessionStorage()` will return `null`.

**Options:**

As with `useSessionStorage()`, there is some additional config you can pass to this hook with a second, `options` argument:

- `parseAsJson: boolean` - defaults to `true`. If you have a previously set session storage value that you don't want to parse using `JSON.parse`, you can set this to `false`
- `parser: (value: string | null) => T` - a custom parser if you have stored a session storage value with a custom serializer function

Related hooks:

If you want to be able to change the value, use [`useSessionStorage()`](/react-hook/use-session-storage).

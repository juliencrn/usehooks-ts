Persist the state with local storage so that it remains after a page refresh. This can be useful for a dark theme.
This hook is used in the same way as useState except that you must pass the storage key in the 1st parameter.
If the window object is not present (as in SSR), `useLocalStorage()` will return the default value.

**Side notes:**

- If you really want to create a dark theme switch, see [useDarkMode()](/react-hook/use-dark-mode).
- If you just want read value from local storage, see [useReadLocalStorage()](/react-hook/use-read-local-storage).

Related hooks:

- [`useSessionStorage()`](/react-hook/use-session-storage)

Persist the state with session storage so that it remains after a page refresh. This can be useful to record session information. This hook is used in the same way as useState except that you must pass the storage key in the 1st parameter. If the window object is not present (as in SSR), `useSessionStorage()` will return the default value.

Related hooks:

- [`useLocalStorage()`](/react-hook/use-local-storage)

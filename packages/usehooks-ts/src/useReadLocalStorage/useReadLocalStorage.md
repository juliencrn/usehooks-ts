This React Hook allows you to read a value from localStorage by its key. It can be useful if you just want to read without passing a default value.
If the window object is not present (as in SSR), or if the value doesn't exist, `useReadLocalStorage()` will return `null`.

**Note:**

If you want to be able to change the value, look [useLocalStorage()](/react-hook/use-local-storage).

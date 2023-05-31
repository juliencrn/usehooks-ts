This React Hook offers you an interface to toggle and read the dark theme mode between three values. It uses internally [`useLocalStorage()`](/react-hook/use-local-storage) to persist the value and listens the OS color scheme preferences.

Returned value

- The `isDarkMode` is a boolean for the final outcome, to let you be able to use with your logic.
- The `ternaryModeCode` is of a literal type `"dark" | "system" | "light"`.

  When `ternaryModeCode` is set to `system`, the `isDarkMode` will use system theme, like of iOS and MacOS.

  Also, `ternaryModeCode` implicitly exports a type with `type TernaryDarkMode = typeof ternaryDarkMode`

Returned interface

- The `toggleTernaryDarkMode` is a function to cycle `ternaryModeCode` between `dark`, `system` and `light`(in this order).
- The `setTernaryDarkMode` accepts a parameter of type `TernaryDarkMode` and set it as `ternaryModeCode`.

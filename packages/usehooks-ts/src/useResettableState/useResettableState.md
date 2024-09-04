# `useResettableState`

A custom React hook that provides a state value, a function to update the state, and a function to reset the state to its initial value.

## Type Parameters

- `T`: The type of the state.

## Parameters

- `initialValue: T | (() => T)`: The initial value of the state or a function that returns the initial value.

## Returns

- `[State<T>, SetState<T>, RestStateFn]`: Returns the current state, a function to update the state, and a function to reset the state to its initial value.

## Example

```tsx
const [value, setValue, resetValue] = useResettableState(2)
```

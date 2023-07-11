This React hook helps to detect which values have changed during each re-render. This is especially useful when you have a pure component (a component that uses `React.memo()`) and don't know which prop is causing it to re-render, particularly when the prop is a reference type like a function or object.

The hook returns an object containing any changes to the props:

```js
{
  prop1: [prevValue, currentValue],
  prop2: [prevValue, currentValue]
}
```

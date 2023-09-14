This React hook provides an API to interact with a `Set` ([Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set))

It takes initial values as array or nothing and returns:

- An array with an instance of `Set` (including: `size, foreach, keys, values, entries, has`)
- And an object of methods (`add, delete, clear`)

Make sure to use these methods to update the set, a `set.add(..)` would not re-render the component.

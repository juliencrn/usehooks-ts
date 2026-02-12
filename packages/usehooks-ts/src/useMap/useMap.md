This React hook provides an API to interact with a `Map` ([Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map))

It takes as initial entries a `Map` or an array like `[["key": "value"], [..]]` or nothing and returns:

- An array with an instance of `Map` (including: `foreach, get, has, entries, keys, values, size`)
- And an object of methods (`set, setAll, remove, reset`)

Make sure to use these methods to update the map, a `map.set(..)` would not re-render the component.

<br />

**Why use Map instead of an object ?**

Map is an iterable, a simple hash and it performs better in storing large data ([Read more](https://azimi.io/es6-map-with-react-usestate-9175cd7b409b)).

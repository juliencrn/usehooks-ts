A simple hook to play a sound effect.

### Parameters

- `src`: The URL of the sound file to be played.
- `options`: An object containing the following optional properties:
  - `preload`: Whether the sound should be preloaded. Defaults to `auto`.

**Note**: If you use this hook in an SSR context, set the `initializeWithValue` option to `false`, it will initialize with `undefined`.

### Returns

An array containing two functions `[play, stop]`. Can be also destructured as an object `{ play, pause, stop }`.

The difference between `stop` and `pause` is that `stop` will reset the sound to the beginning, while `pause` will pause the sound and resume from where it was paused.

Use EventListener with simplicity by React Hook.

Supports `Window`, `Element` and `Document` and custom events with almost the same parameters as the native [`addEventListener` options](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#syntax). See examples below.

If you want to use your CustomEvent using Typescript, you have to declare the event type.
Find witch kind of Event you want to extends:

- `MediaQueryListEventMap`
- `WindowEventMap`
- `HTMLElementEventMap`
- `DocumentEventMap`

Then declare your custom event:

```ts
declare global {
  interface DocumentEventMap {
    'my-custom-event': CustomEvent<{ exampleArg: string }>
  }
}
```

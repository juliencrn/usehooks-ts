The idea of the hook is pretty neat and simple, and serves for a wide range of usecases :

- the `form` valiation is built on top of javascirpt `constraint validation` api.
- give the user the ability to opt into make the component/input `controlled` if they want to render part of the `ui` based on the `state`, but by default it's `uncontrolled` to prevent unnecssary re-rendering.
- In case any of the `form` controls/inputs is `invalid`, the user can display custom error messages if they're not happy with the built-in ones.

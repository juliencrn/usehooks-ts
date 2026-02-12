# Changelog

## 3.1.1

### Patch Changes

- b1dffb9: feat: Update peerDependencies to include React 19 @michal-worwag

## 3.1.0

### Minor Changes

- 06dfd5e: Add `remove` function to `useLocalStorage` and `useSessionStorage` (@k-melnychuk & @RubyHuntsman)

### Patch Changes

- e62c41f: Restoration of the `useTernaryDarkMode` related types (@soullivaneuh)
- 90a33f5: fix: reject non-boolean value as a `defaultValue` for `useBoolean` (@luckrnx09)
- 7ba7e3a: test reset for `useCounter` (#570 by @luckrnx09)

## 3.0.2

### Patch Changes

- b14db5b: Add support for focus event to `useOnClickOutside` (Fixes: #522)
- 59c0b93: Add SVG element support to `useEventListener` (#546 by @LumaKernel)
- b14db5b: Expose `AddEventListenerOptions` in `useOnClickOutside` (Fixes #554 from @metav-drimz)
- b14db5b: Support missing refs in `useOnClickOutside` (Fixes: #531)
- 09341a3: feat(useEventCallback): allow optional callback (#550 by @Newbie012)

## 3.0.1

### Patch Changes

- Fix: Update exported files

## 3.0.0

### Major Changes

- a8e8968: Remove previously deprecated hooks and hooks' signatures (#503)
- a8e8968: Improve JSDoc comments and rename or make private some type aliases
- a8e8968: Prefer type over interface (#515)
- a8e8968: Move the full workspace into ES Module

## 2.16.0

### Minor Changes

- 9b65ce8: Add `id` param to `useScript` hook (from #285 by @misidoro)

### Patch Changes

- d881f08: Add `isLocked` state to the `useScrollLock` return (#521 by @kyrylo-soulandwolf)
- fc25779: Resolve warning when using `useScrollLock` in an SSR environment (#521 by @kyrylo-soulandwolf)
- d42741f: Wrap `useCountdown` methods with `useCallback` (from #326 by @gromchen)
- d42741f: Wrap `useCounter` methods with `useCallback` (from #326 by @gromchen)
- d881f08: Fixed `useScrollLock` leaving inline styles (#516 from @novacdenis)
- 0d99db9: chore(deps): update all non-major dependencies
- d881f08: Fixed reflow not considering the padding before the lock (#521 by @kyrylo-soulandwolf)

## 2.15.1

### Patch Changes

- b88cc01: fix `useResizeObserver` initialSize mutation (#504 from @iuriiiurevich)
- 823b62f: Resolve scroll lock issue on ios safari (#509 by @jontewks)

## 2.15.0

### Minor Changes

- 649ef39: ✨ Feature: add `useScrollLock` hook

### Patch Changes

- 649ef39: Deprecated `useLockedBody` replaced by `useScrollLock`
- 6514683: Fix `useMediaQuery` by defining getMatches before use
- d8d8e5d: Upgrade dependencies

## 2.14.0

### Minor Changes

- d60f1c6: Added debounce option to both `useScreen` and `useWindowSize`

### Patch Changes

- 7d74e09: Release documentation for `useEventCallback`
- 2660580: Depreciated `useFetch`, see documentation for more information
- bc3f967: Deprecated `useEffectOnce`, `useIsFirstRender` and `useUpdateEffect`

## 2.13.0

### Minor Changes

- 87a5141: Improve `useOnClickOutside`:

  - Prevent handling callback when clicking on a not connected element (#374 by @hooriza)
  - Add support to accept multiple references
  - Add support for touch events in addition to mouse events

- 87ba579: Fix SSR hooks by fallback with default or initial value instead of `undefined`
- f39078f: Updated `useIntersectionObserver` API and fixed #395, #271 and #182, see #464.
- a444ba7: Depreciated `useElementSize` replaced by `useResizeObserver`
- e807ab3: Create `useResizeObserver` hook

### Patch Changes

- b5b9e1f: chore: Updated dependencies
- 4146c39: fix: `useScript` failed to remove script from cache when passing `removeOnUnmount` prop (#354 by @ShanSenanayake)
- bdf7bda: Add eslint rules to comply with `verbatimModuleSyntax` to avoid side-effects
- 6b582de: use `tsup` as bundler instead of transpiling with tsc (@BlankParticle)
- be8c35b: Fix `useScreen` is not rerendering on screen resize (#280 by @philipgher)

## 2.12.1

### Patch Changes

- Don't remove comments during package build to keep JSdoc comments

## 2.12.0

### Minor Changes

- cb6eb5c: Added an optional option param in `useDocumentTitle()` to reset title on un-mount (#345 by @ladislasdellinger)

### Patch Changes

- b8ee088: move `lodash.debounce` to dependencies from peerDependencies

## 2.11.0

### Minor Changes

- add1431: Created `useUnmount` hook
- add1431: Created `useDebounceCallback` and `useDebounceValue` hooks
- add1431: Depreciated `useDebounce` hook (replaced by `useDebounceCallback` or `useDebounceValue`)
- fc8a30e: Fix hydration issues in both useScreen and useMediaQuery (Fixes #394, thanks to @bryantcodesart)
- 4a9fc88: Introduce the SSR-friendly new optional `{ initializeWithValue?: boolean }` parameter to useLocalStorage, useReadLocalStorage, useSessionStorage, useDarkMode, useTernaryDarkMode, useMediaQuery, useScreen, useWindowSize and useElementSize, see #451.
- 5c210c1: Add `defaultValue` option to `useTernaryDarkMode` and update its signature (using function overload for smooth migration)
- 5c210c1: Update `useDarkMode` signature (using function overload for smooth migration)
- 0321342,4a9fc88: Drop `Map`, `Set` and `Date` supports in use\*Storage hooks, it isn't compatible with `useReadLocalStorage` making the API un-consistent. Use a custom serializer/deserializer instead.

### Patch Changes

- add1431: Upgrade dependencies
- a192167: Upgraded `react` and `@testing-library/react` (thanks to @TheHaff)
- 0321342: Make Typescript and `@typescript-eslint` stricter to catch bugs sooner
- 382161a: Depreciate `useImageOnLoad`, too opinionated
- 382161a: Add JSdoc comments to improve DX via in-IDE documentation
- a192167: Migrate from `jest` to `vitest` (making test-suite execution 2 times faster)

## 2.10.0

### Minor Changes

- 8f3c90f: Enable setting localStorage key for useDarkTheme & useTernaryDarkMode (#298 by @ubarbaxor)
- ae47c9a: Expose setting dark mode value directly (#299 by ubarbaxor)
- 771afa5: Add serialization support for use-\*-storage hooks

### Patch Changes

- a816d6b: Depreciated useSsr [#258](https://github.com/juliencrn/usehooks-ts/issues/258)
- 42f3a3a: Remove the need of commenting out useEffect deps in useMediaQuery (#383 by @lisandro52)
- 9bc05f4: Fix hydration mismatch on use\*\*\*Storage (fixes #176, #369 with #320 & #251)
- 771afa5: Add Date, Set & Map support to use\*Storage (#309 by @AlecsFarias)
- 4b3ed4e: Fix circular dependencies (#310)
- a3588b8: Added unit tests for useFetch hook
- c326dd3: Prevent unrelated storage keys from being updated unexpectedly in useLocalStorage and useSessionStorage (#313 by @stevenvachon fixes #384)
- e8aa777: make useLocalStorage and useSessionStorage compliant with useState (fixes #204 with #242 by @valyrie97)
- c5ad2b9: Recalculate useLocalStorage & useSessionStorage default value on dynamic key change (#355 by @amirking59)
- 7406e3c: fix(useCopyToClipboard): added useCallback to 'copy' to avoid rerendering (by @nmacianx)
- ffe0f32: Set sideEffects to false in package.json

## 2.9.5

### Patch Changes

- 7141d01: Upgrade internal dependencies
- Update useCopyToClipboard documentation
- Fix typo in useEventListener

## 2.9.4

### Patch Changes

- hotfix: package files missing

## [2.9.3](https://www.npmjs.com/package/usehooks-ts/v/2.9.3) - 2024-01-13

### Patch Changes

- Fix #420

## 2.9.2

### Patch Changes

- 55a1904: added export map in package.json
- use named exports instead of default exports
- fix useEventListener docs typo

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.9.1](https://www.npmjs.com/package/usehooks-ts/v/2.9.1) - 2022-10-13

### Fixes

- fix hard-coded useLockedBody anchor id
- useEventListener passes options to removeEventListener (#235 by @marnusw)
- rename useBoolean, useCounter, useLockedBody and useSidebar hooks ReturnType to Output (#234 by valentinpolitov)

## [2.9.0](https://www.npmjs.com/package/usehooks-ts/v/2.9.0) - 2022-10-13

### Fixes

- Transpile commonjs to es5 (fixes #232)

## [2.8.0](https://www.npmjs.com/package/usehooks-ts/v/2.8.0) - 2022-10-13

### Added

- Added useToggle
- Added options in useScript (#203, #197 by @curtvict)
- Added media query support to useEventListener (#194 by @modex98)

### Updated

- Remove React import line in all files

### Fixes

- docs misspelling (#189 by @JoshuaCS94)
- useIntersectionObserver deps (#195 by @Guesswhoitis)

## [2.7.2](https://www.npmjs.com/package/usehooks-ts/v/2.7.2) - 2022-09-30

### Added

- Added useDocumentTitle (#218 by @curtvict)

### Updated

- Removed `import React` line (not needed since react 17)

### Fixes

- Fixed misspelling (thanks to @alexisoney and @JoshuaCS94)

## [2.7.1](https://www.npmjs.com/package/usehooks-ts/v/2.7.1) - 2022-09-22

### Added

- Support React 18 (#214 by @sharvit)

### Updated

- Remove hooks index files
- Remove source-map

## [2.7.0](https://www.npmjs.com/package/usehooks-ts/v/2.7.0) - 2022-09-19

### Updated

- Move usehooks-ts to the root
- Simplify config files (removing some tools)
- Split the documentation website from the workspace
- Regroup hooks related files together (test, doc, demo, hook)
- Upgrade dependencies

## [2.6.0](https://www.npmjs.com/package/usehooks-ts/v/2.6.0) - 2022-06-20

### Added

- useEventListener now supports `Document` events
- useEventListener now supports native event listener options
- Add useSessionStorage (#171 by @createdbymahmood)
- Add unit tests on useHover (#169 by @createdbymahmood)

## [2.5.4](https://www.npmjs.com/package/usehooks-ts/v/2.5.4) - 2022-05-30

### Added

- improve useCountdown interface (#160 by @PabloLION)
- add SSR unit tests on useIsClient (#161 by @createdbymahmood)

## [2.5.3](https://www.npmjs.com/package/usehooks-ts/v/2.5.3) - 2022-05-16

### Added

- Ignore unrelated 'storage' events in useLocalStorage (#153 from @bogdanailincaipnt)

### Fixes

- Revert #143 useEffectOnce (#152 from @jherr)

## [2.5.2](https://www.npmjs.com/package/usehooks-ts/v/2.5.2) - 2022-05-02

### Fixes

- Fix useFetch (#139 from @daiky218)
- Fix useEffectOnce (#147 from @3GOMESz)

## [2.5.1](https://www.npmjs.com/package/usehooks-ts/v/2.5.1) - 2022-04-12

### Fixes

- Revert dependencies

## [2.5.0](https://www.npmjs.com/package/usehooks-ts/v/2.5.0) - 2022-04-11

### Added

- Memoise useBoolean (#122 from @angusd3v)
- make setter from useLocalStorage referentially stable (#133 from @jbean96)
- add support for useMediaQuery in older versions (#135 from @brycedorn)
- update dependencies

## [2.4.2](https://www.npmjs.com/package/usehooks-ts/v/2.4.2) - 2022-02-27

### Added

- Improve useEventListener reactivity (#117 from @TunA-Kai)
- Use useIsomorphicLayoutEffect instead of useLayoutEffect
- Memoise useLocalStorage setter (from #118)

## [2.4.1](https://www.npmjs.com/package/usehooks-ts/v/2.4.1) - 2022-02-21

### Added

- Add unit tests on useWindowSize (#112 from @createdbymahmood)
- Add unit tests on useElementSize (#111 from @createdbymahmood)
- Add useIsomorphicLayoutEffect and replace all useLayoutEffect (#116)

### Fixes

- Fix use[Read]LocalStorage render cycle (#109 from @bogdanailincaipnt)

## [2.4.0](https://www.npmjs.com/package/usehooks-ts/v/2.4.0) - 2022-02-12

### Added

- Add unit tests on useInterval (#104/#106 from @createdbymahmood)
- Add unit tests on useDarkMode (#105/#106 from @createdbymahmood)

### Updated

- Update local-storage key in useTernaryDarMode (#98 from @PabloLION)
- Update local-storage key in useDarMode (#98 from @PabloLION)
- Update Typescript to 4.5.5 (minor)

## [2.3.0](https://www.npmjs.com/package/usehooks-ts/v/2.3.0) - 2022-01-30

### Added

- Create useTernaryDarMode (#89 from @PabloLION)

## [2.2.2](https://www.npmjs.com/package/usehooks-ts/v/2.2.2) - 2022-01-25

### Fix

- Fix esm and source map (issued (#88) by @egehandulger)

## [2.2.1](https://www.npmjs.com/package/usehooks-ts/v/2.2.1) - 2022-01-12

### Added

- Fix types add tests on useEventListener (#82 from @egehandulger)

## [2.2.0](https://www.npmjs.com/package/usehooks-ts/v/2.2.0) - 2022-01-03

### Added

- Add tests on useIsMounted (#75 from @DidrikLind)
- Add useCountdown() hook (#76 from @hexp1989)
- Add tests on useDebounce (#80 from @DidrikLind)

## [2.1.0](https://www.npmjs.com/package/usehooks-ts/v/2.1.0) - 2021-12-01

### Added

- Create media query hook (#74 from @AbbalYouness)
- Add param to allow 'mouseup' event on useOnClickOutside (#69 from @JamesBarretDev)

## [2.0.2](https://www.npmjs.com/package/usehooks-ts/v/2.0.2) - 2021-11-19

### Added

- Create useClickAnyWhere hook (#66 from @sonjoydatta)

### Fixes

- Fix useTimeout and useInterval (#65 from @oluckyman).
- Fix useOnClickOutside (bug introduced in the 2.0.1).

## [2.0.1](https://www.npmjs.com/package/usehooks-ts/v/2.0.1) - 2021-11-17

### Added

- Simplify useOnClickOutside (introduces a bug fixed in 2.0.2)

## [2.0.0](https://www.npmjs.com/package/usehooks-ts/v/2.0.0) - 2021-11-16

### BREAKING CHANGE

- Fixing the useElementSize changes the hook interface.

## [1.2.1](https://www.npmjs.com/package/usehooks-ts/v/1.2.1) - 2021-11-10

### Added

- useEffectOnce()
- useUpdateEffect()
- useIsFirstRender()
- Add Revonate

### Fixes

- fix(site-templates-post): Fixed edit link (#59 from @ducktordanny)

## [1.1.1](https://www.npmjs.com/package/usehooks-ts/v/1.1.1) - 2021-11-08

### Added

- Add renovate bot.
- Upgrade @Material-ui to Mui@5 (including a lot of UI refactoring)
- Upgrade Gatsby to v4.

### Fix

- Re-generate package-lock.json due wrong npm version.

## [1.1.0](https://www.npmjs.com/package/usehooks-ts/v/1.1.0) - 2021-11-06

- Use useEventListener in the hooks when possible #DRY.
- Enforce tree-shaking support with an Eslint plugin.
- New hook: useStep() (#48 from @qlaffont).

## [1.0.14](https://www.npmjs.com/package/usehooks-ts/v/1.0.14) - 2021-11-03

### Added

- CHANGELOG.md was created.
- SemVer started.
- Upgrade Node and NPM to publish quickly with lerna

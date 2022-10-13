# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.8.0](https://www.npmjs.com/package/usehooks-ts/v/2.8.0) - 2022-10-13

### Added

- Added useToggle
- Added options in useScript (#203, #197 by @curtvict)
- Added media query support to useEventListener (#194 from @modex98)

### Updated

- Remove React import line in all files

### Fixes

- docs misspelling (#189 by @JoshuaCS94)
- useIntersectionObserver deps (#195 from @Guesswhoitis)

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

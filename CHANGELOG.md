# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.2](https://www.npmjs.com/package/usehooks-ts/v/2.1.0) - 2021-12-01

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

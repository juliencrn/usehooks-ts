# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.1] - 2021-11-08

### Added

- Add renovate bot.
- Upgrade @Material-ui to Mui@5 (including a lot of UI refactoring)
- Upgrade Gatsby to v4.

### Fix

- Re-generate package-lock.json due wrong npm version.

## [1.1.0] - 2021-11-06

- Use useEventListener in the hooks when possible #DRY.
- Enforce tree-shaking support with an Eslint plugin.
- New hook: useStep() (#48 from @qlaffont).

## [1.0.14] - 2021-11-03

### Added

- CHANGELOG.md was created.
- SemVer started.
- Upgrade Node and NPM to publish quickly with lerna

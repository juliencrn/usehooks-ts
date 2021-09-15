<div align="center">
<h1>useHooks(🔥).ts</h1>

React hook library, ready to use, written in Typescript.

&mdash; [usehooks-typescript.com](https://usehooks-typescript.com/) &mdash;

**README Sections:** [About](#-about) - [Hook Summary](#-summary) - [Installation](#-installation) - [Made with](#-made-with) - [Contributing](#-contributing) - [License](#-license)

<!-- Badges -->

[![Netlify Status](https://api.netlify.com/api/v1/badges/f1f0f5a4-8207-499b-b912-d99acb04176e/deploy-status)](https://app.netlify.com/sites/usehooks-ts/deploys)
[![Open Source? Yes!](https://badgen.net/badge/Open%20Source%20%3F/Yes%21/blue?icon=github)](https://github.com/juliencrn/usehooks.ts/issues)
[![Maintained](https://badgen.net/badge/Maintained%20%3F/Yes%21/blue?icon=github)](https://github.com/juliencrn/usehooks.ts/issues)
[![License](https://badgen.net/badge/License/MIT/blue)](https://github.com/juliencrn/usehooks.ts/blob/master/LICENSE)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

</div>

## 🤔 About

This is the repository for [usehooks.ts](https://usehooks-typescript.com/), a [Gatsby](https://www.gatsbyjs.org) powered blog hosted with Github & netlify that publishes easy to understand React Hook code snippets.

UseHooks.ts has been strongly inspired by [usehooks.com](https://usehooks.com), thanks to him. My objective here is to publish my hooks in Typescript in order to find them quickly

If you'd like to submit new post ideas, improve existing posts, or change anything about the website feel free to submit an issue or pull-request.

## 📖 Summary

<div id="hook-list">

- [useBoolean](https://usehooks-typescript.com/react-hook/use-boolean)
- [useCopyToClipboard](https://usehooks-typescript.com/react-hook/use-copy-to-clipboard)
- [useCounter](https://usehooks-typescript.com/react-hook/use-counter)
- [useDarkMode](https://usehooks-typescript.com/react-hook/use-dark-mode)
- [useDebounce](https://usehooks-typescript.com/react-hook/use-debounce)
- [useElementSize](https://usehooks-typescript.com/react-hook/use-element-size)
- [useEventListener](https://usehooks-typescript.com/react-hook/use-event-listener)
- [useFetch](https://usehooks-typescript.com/react-hook/use-fetch)
- [useHover](https://usehooks-typescript.com/react-hook/use-hover)
- [useImageOnLoad](https://usehooks-typescript.com/react-hook/use-image-on-load)
- [useIntersectionObserver](https://usehooks-typescript.com/react-hook/use-intersection-observer)
- [useInterval](https://usehooks-typescript.com/react-hook/use-interval)
- [useIsClient](https://usehooks-typescript.com/react-hook/use-is-client)
- [useIsMounted](https://usehooks-typescript.com/react-hook/use-is-mounted)
- [useLocalStorage](https://usehooks-typescript.com/react-hook/use-local-storage)
- [useLockedBody](https://usehooks-typescript.com/react-hook/use-locked-body)
- [useOnClickOutside](https://usehooks-typescript.com/react-hook/use-on-click-outside)
- [useReadLocalStorage](https://usehooks-typescript.com/react-hook/use-read-local-storage)
- [useScreen](https://usehooks-typescript.com/react-hook/use-screen)
- [useScript](https://usehooks-typescript.com/react-hook/use-script)
- [useSsr](https://usehooks-typescript.com/react-hook/use-ssr)
- [useTimeout](https://usehooks-typescript.com/react-hook/use-timeout)
- [useWindowSize](https://usehooks-typescript.com/react-hook/use-window-size)

</div>

## 👉 Installation

**Note**: The project use `Node@14` and `npm@6`.

```bash
# Clone the repository
git clone https://github.com/juliencrn/usehooks.ts.git
cd useHooks.ts

# Install dependencies
npm i

# Start
npm start
```

### Others scripts

```bash
# Production
npm run build # Create production bundle
npm run serve # Run production bundle

# Development
npm run start # Start and watch app locally
npm run develop # Same as above
npm run clean # Remove gatsby cache and previous builds
npm run lint # Run Eslint checker
npm run lint-fix # Same as above and do fix automatically
npm run format # Run Prettier and do fix automatically
npm run check # Run Typescript types checker
npm run test # Exec lint, check and run Jest
npm run test:watch # Same as above in watch mode
npm run upgrade-interactive # Interactive CLI app to upgrade dependencies

# Content
npm run plop # Create a hook component with CLI tool
npm run copy:hooks # Create *.mdx files from hook's source code
npm run update:readme # Update hooks summary in readme
```

See more in [package.json](./package.json).

## 🙌 Made with

[React](https://reactjs.org/) - [Typescript](https://www.typescriptlang.org/) - [Gatsby](https://www.gatsbyjs.com/) - [Material-ui](https://material-ui.com/) - [Jest](https://jestjs.io/) - [@testing-library](https://testing-library.com/) - [Mdx](https://mdxjs.com/) - [Prism](https://prismjs.com/) - [Dracula colors](https://draculatheme.com/)

## 🚗 Roadmap

- [ ] Add new hooks
- [ ] Set up automated tests for hooks
- [ ] Add a live preview system to interact with hooks

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

Feel free to check [issues page](https://github.com/juliencrn/usehooks.ts/issues).

## 💚 Support the project

Give a ⭐ if this project helped you!

Thanks! ❤️

## 📝 License

Copyright © 2020 [Julien Caron](https://github.com/juliencrn).

This project is [MIT](https://github.com/juliencrn/usehooks.ts/blob/master/LICENSE) licensed.

---

Built with ❤️ with [Gatsby](https://www.gatsbyjs.com/) & [Typescript](https://www.typescriptlang.org/)

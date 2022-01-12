<img src="./screenshot.png" alt="usehooks-ts banner" align="center" />

<br />

<div align="center">
<h1>usehooks-ts</h1>

<div>React hook library, ready to use, written in Typescript.</div>

<br />

<!-- Badges -->

[![Netlify Status](https://api.netlify.com/api/v1/badges/f1f0f5a4-8207-499b-b912-d99acb04176e/deploy-status)](https://app.netlify.com/sites/usehooks-ts/deploys)
[![Open Source? Yes!](https://badgen.net/badge/Open%20Source%20%3F/Yes%21/blue?icon=github)](https://github.com/juliencrn/usehooks-ts/issues)
[![Maintained](https://badgen.net/badge/Maintained%20%3F/Yes%21/blue?icon=github)](https://github.com/juliencrn/usehooks-ts/issues)
[![License](https://badgen.net/badge/License/MIT/blue)](https://github.com/juliencrn/usehooks-ts/blob/master/LICENSE)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/usehooks-ts)
![npm](https://img.shields.io/npm/v/usehooks-ts)<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-44-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

<br />
  <pre>npm i <a href="https://www.npmjs.com/package/usehooks-ts">usehooks-ts</a></pre>
  <br />

<div align="center">
  <sub>Created by <a href="https://github.com/juliencrn">Julien Caron</a> and maintained with ❤️ by an amazing <a href="#contributors">team of developers</a>.</sub>
</div>

</div>

<br />

## 🤔 About

Initially, `usehooks-ts` was a [Gatsby](https://www.gatsbyjs.org) powered blog hosted with Github & netlify that publishes easy to understand React Hook code snippets.

But now, it's a monorepo containing:

- A static website used as hooks documentation ([Link](https://usehooks-ts.com/)).
- An NPM package containing the hooks library ([Link](https://www.npmjs.com/package/usehooks-ts)).

If you'd like to submit new post ideas, improve existing posts, or change anything about the website feel free to submit an issue or pull-request.

## 📖 Summary

<!-- HOOKS:START -->

- [`useBoolean()`](https://usehooks-ts.com/react-hook/use-boolean)
- [`useClickAnyWhere()`](https://usehooks-ts.com/react-hook/use-click-any-where)
- [`useCopyToClipboard()`](https://usehooks-ts.com/react-hook/use-copy-to-clipboard)
- [`useCountdown()`](https://usehooks-ts.com/react-hook/use-countdown)
- [`useCounter()`](https://usehooks-ts.com/react-hook/use-counter)
- [`useDarkMode()`](https://usehooks-ts.com/react-hook/use-dark-mode)
- [`useDebounce()`](https://usehooks-ts.com/react-hook/use-debounce)
- [`useEffectOnce()`](https://usehooks-ts.com/react-hook/use-effect-once)
- [`useElementSize()`](https://usehooks-ts.com/react-hook/use-element-size)
- [`useEventListener()`](https://usehooks-ts.com/react-hook/use-event-listener)
- [`useFetch()`](https://usehooks-ts.com/react-hook/use-fetch)
- [`useHover()`](https://usehooks-ts.com/react-hook/use-hover)
- [`useImageOnLoad()`](https://usehooks-ts.com/react-hook/use-image-on-load)
- [`useIntersectionObserver()`](https://usehooks-ts.com/react-hook/use-intersection-observer)
- [`useInterval()`](https://usehooks-ts.com/react-hook/use-interval)
- [`useIsClient()`](https://usehooks-ts.com/react-hook/use-is-client)
- [`useIsFirstRender()`](https://usehooks-ts.com/react-hook/use-is-first-render)
- [`useIsMounted()`](https://usehooks-ts.com/react-hook/use-is-mounted)
- [`useLocalStorage()`](https://usehooks-ts.com/react-hook/use-local-storage)
- [`useLockedBody()`](https://usehooks-ts.com/react-hook/use-locked-body)
- [`useMap()`](https://usehooks-ts.com/react-hook/use-map)
- [`useMediaQuery()`](https://usehooks-ts.com/react-hook/use-media-query)
- [`useOnClickOutside()`](https://usehooks-ts.com/react-hook/use-on-click-outside)
- [`useReadLocalStorage()`](https://usehooks-ts.com/react-hook/use-read-local-storage)
- [`useScreen()`](https://usehooks-ts.com/react-hook/use-screen)
- [`useScript()`](https://usehooks-ts.com/react-hook/use-script)
- [`useSsr()`](https://usehooks-ts.com/react-hook/use-ssr)
- [`useStep()`](https://usehooks-ts.com/react-hook/use-step)
- [`useTimeout()`](https://usehooks-ts.com/react-hook/use-timeout)
- [`useUpdateEffect()`](https://usehooks-ts.com/react-hook/use-update-effect)
- [`useWindowSize()`](https://usehooks-ts.com/react-hook/use-window-size)

<!-- HOOKS:END -->

## 👉 Installation

**Note**: The project uses `Node@^16` and `npm@^8`.

Two ways:

1. Install `usehooks-ts` from npm to use it in your project.
2. Install the current whole repository to contribute to it.

### 1. Install `usehooks-ts`

```bash
npm i usehooks-ts
```

Then go to the [documentation](https://usehooks-ts.com/).

### 2. Develop `usehooks-ts`

```bash
# Clone the repository
git clone https://github.com/juliencrn/usehooks-ts.git
cd usehooks-ts

# Install dependencies and setup
npm run bootstrap

# Start (Will start the frontend and the test:watch for the hooks packages)
npm start

# Generate a new hook
npm run plop

# Exec types-checking, linters and tests
npm run test

# Update dependencies (in each packages)
npx npm-check -u
```

See more in [package.json](./package.json).

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/juliencrn"><img src="https://avatars.githubusercontent.com/u/14028029?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Julien</b></sub></a><br /><a href="#content-juliencrn" title="Content">🖋</a> <a href="https://github.com/juliencrn/usehooks-ts/commits?author=juliencrn" title="Code">💻</a> <a href="#design-juliencrn" title="Design">🎨</a> <a href="#ideas-juliencrn" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/a777med"><img src="https://avatars.githubusercontent.com/u/15968280?v=4?s=80" width="80px;" alt=""/><br /><sub><b>a777med</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=a777med" title="Code">💻</a></td>
    <td align="center"><a href="https://datkira.com/"><img src="https://avatars.githubusercontent.com/u/53250212?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Nguyen Tien Dat</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=datkira" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/elifer5000"><img src="https://avatars.githubusercontent.com/u/4311278?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Elias Cohenca</b></sub></a><br /><a href="#content-elifer5000" title="Content">🖋</a></td>
    <td align="center"><a href="http://joaov.com.br/"><img src="https://avatars.githubusercontent.com/u/17601527?v=4?s=80" width="80px;" alt=""/><br /><sub><b>João Deroldo</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Ajoaoderoldo" title="Bug reports">🐛</a> <a href="https://github.com/juliencrn/usehooks-ts/commits?author=joaoderoldo" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Nishit-Dua"><img src="https://avatars.githubusercontent.com/u/35453301?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Nishit</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=Nishit-Dua" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/jonkoops"><img src="https://avatars.githubusercontent.com/u/695720?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Jon Koops</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=jonkoops" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/LoneRifle"><img src="https://avatars.githubusercontent.com/u/10572368?v=4?s=80" width="80px;" alt=""/><br /><sub><b>LoneRifle</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=LoneRifle" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/vfonic"><img src="https://avatars.githubusercontent.com/u/67437?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Viktor</b></sub></a><br /><a href="#ideas-vfonic" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Avfonic" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/bclermont"><img src="https://avatars.githubusercontent.com/u/474302?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Bruno Clermont</b></sub></a><br /><a href="#question-bclermont" title="Answering Questions">💬</a></td>
    <td align="center"><a href="https://github.com/yoannesbourg"><img src="https://avatars.githubusercontent.com/u/73404603?v=4?s=80" width="80px;" alt=""/><br /><sub><b>yoannesbourg</b></sub></a><br /><a href="#ideas-yoannesbourg" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/strange2x"><img src="https://avatars.githubusercontent.com/u/10759731?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Strange2x</b></sub></a><br /><a href="#ideas-strange2x" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/steinybot"><img src="https://avatars.githubusercontent.com/u/4659562?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Jason Pickens</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Asteinybot" title="Bug reports">🐛</a></td>
    <td align="center"><a href="http://smackagency.com/"><img src="https://avatars.githubusercontent.com/u/3469560?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Sel-Vin Kuik</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Aselvinkuik" title="Bug reports">🐛</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/isaacalves"><img src="https://avatars.githubusercontent.com/u/1765942?v=4?s=80" width="80px;" alt=""/><br /><sub><b>isaac</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Aisaacalves" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/brunorzn"><img src="https://avatars.githubusercontent.com/u/18266054?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Bruno RZN</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=brunorzn" title="Code">💻</a> <a href="https://github.com/juliencrn/usehooks-ts/pulls?q=is%3Apr+reviewed-by%3Abrunorzn" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="http://www.cykeprojects.com/"><img src="https://avatars.githubusercontent.com/u/2979318?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Nathan Manceaux-Panot</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=Cykelero" title="Code">💻</a> <a href="https://github.com/juliencrn/usehooks-ts/pulls?q=is%3Apr+reviewed-by%3ACykelero" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/meotimdihia"><img src="https://avatars.githubusercontent.com/u/300961?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Dien Vu</b></sub></a><br /><a href="#ideas-meotimdihia" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/olegKusov"><img src="https://avatars.githubusercontent.com/u/28058268?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Oleg Kusov</b></sub></a><br /><a href="#ideas-olegKusov" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="http://mattguy.me/"><img src="https://avatars.githubusercontent.com/u/6647355?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Matthew Guy</b></sub></a><br /><a href="#ideas-mankittens" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/andrewbihl"><img src="https://avatars.githubusercontent.com/u/16709744?v=4?s=80" width="80px;" alt=""/><br /><sub><b>andrewbihl</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Aandrewbihl" title="Bug reports">🐛</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/lancepollard"><img src="https://avatars.githubusercontent.com/u/86631222?v=4?s=80" width="80px;" alt=""/><br /><sub><b>lancepollard</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Alancepollard" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/gmukul01"><img src="https://avatars.githubusercontent.com/u/3636885?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Mukul Bansal</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Agmukul01" title="Bug reports">🐛</a></td>
    <td align="center"><a href="http://127.0.0.1:8000/"><img src="https://avatars.githubusercontent.com/u/474302?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Jean-Luc Mongrain sur la Brosse</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=jeanlucmongrain" title="Code">💻</a> <a href="#ideas-jeanlucmongrain" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/n1c"><img src="https://avatars.githubusercontent.com/u/284075?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Nic</b></sub></a><br /><a href="#content-n1c" title="Content">🖋</a></td>
    <td align="center"><a href="http://valtism.com/"><img src="https://avatars.githubusercontent.com/u/1286001?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Dan Wood</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=valtism" title="Code">💻</a></td>
    <td align="center"><a href="http://www.sixt.de/"><img src="https://avatars.githubusercontent.com/u/25299148?v=4?s=80" width="80px;" alt=""/><br /><sub><b>jo wendenbuerger</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3AWendenburg" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://nozillium.com/"><img src="https://avatars.githubusercontent.com/u/4774875?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Andrew Nosenko</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Anoseratio" title="Bug reports">🐛</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/CharlieJhonSmith"><img src="https://avatars.githubusercontent.com/u/90845154?v=4?s=80" width="80px;" alt=""/><br /><sub><b>CharlieJhonSmith</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=CharlieJhonSmith" title="Code">💻</a></td>
    <td align="center"><a href="https://keybase.io/soullivaneuh"><img src="https://avatars.githubusercontent.com/u/1698357?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Sullivan SENECHAL</b></sub></a><br /><a href="#ideas-soullivaneuh" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/jaslong"><img src="https://avatars.githubusercontent.com/u/797348?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Jason Long</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Ajaslong" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/kxm766"><img src="https://avatars.githubusercontent.com/u/88443148?v=4?s=80" width="80px;" alt=""/><br /><sub><b>kxm766</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Akxm766" title="Bug reports">🐛</a></td>
    <td align="center"><a href="http://qlaffont.com/"><img src="https://avatars.githubusercontent.com/u/10044790?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Quentin</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=qlaffont" title="Code">💻</a> <a href="#ideas-qlaffont" title="Ideas, Planning, & Feedback">🤔</a> <a href="#content-qlaffont" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/ducktordanny"><img src="https://avatars.githubusercontent.com/u/38068717?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Daniel Lazar</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=ducktordanny" title="Code">💻</a> <a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Aducktordanny" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/mterrel"><img src="https://avatars.githubusercontent.com/u/17746857?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Mark Terrel</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Amterrel" title="Bug reports">🐛</a> <a href="https://github.com/juliencrn/usehooks-ts/commits?author=mterrel" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/mendrik"><img src="https://avatars.githubusercontent.com/u/160805?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Andreas Herd</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Amendrik" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://sonjoydatta.me/"><img src="https://avatars.githubusercontent.com/u/49079726?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Sonjoy Datta</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=sonjoydatta" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/oluckyman"><img src="https://avatars.githubusercontent.com/u/642673?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Ilya Belsky</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Aoluckyman" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://jamesbarrett.io/"><img src="https://avatars.githubusercontent.com/u/42980207?v=4?s=80" width="80px;" alt=""/><br /><sub><b>James Barrett</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=JamesBarrettDev" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/AbbalYouness"><img src="https://avatars.githubusercontent.com/u/15120524?v=4?s=80" width="80px;" alt=""/><br /><sub><b>AbbalYouness</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=AbbalYouness" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/DidrikLind"><img src="https://avatars.githubusercontent.com/u/14201715?v=4?s=80" width="80px;" alt=""/><br /><sub><b>didriklind</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=DidrikLind" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/hexp1989"><img src="https://avatars.githubusercontent.com/u/2241985?v=4?s=80" width="80px;" alt=""/><br /><sub><b>hexp1989</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=hexp1989" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://www.linkedin.com/in/alvaro-serrano-rivas/"><img src="https://avatars.githubusercontent.com/u/43758471?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Alvaro Serrano</b></sub></a><br /><a href="#content-alvaroserrrano" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/egehandulger"><img src="https://avatars.githubusercontent.com/u/14878259?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Egehan Dülger</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=egehandulger" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## 🚗 Roadmap

- [ ] Add new hooks (web3 hooks are welcome!)
- [ ] Develop automated tests for all hooks

## 📝 License

This project is [MIT](https://github.com/juliencrn/usehooks-ts/blob/master/LICENSE) licensed.

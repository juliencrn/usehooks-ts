<img src="./.github/screenshot.png" alt="usehooks-ts banner" align="center" />

<br />

<div align="center">
<h1>usehooks-ts</h1>

<div>React hook library, ready to use, written in Typescript.</div>

<br />

<!-- Badges -->

[![License](https://badgen.net/badge/License/MIT/blue)](https://github.com/juliencrn/usehooks-ts/blob/master/LICENSE)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/usehooks-ts)
![npm](https://img.shields.io/npm/v/usehooks-ts)<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-233-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

<br />
  <pre>npm i <a href="https://www.npmjs.com/package/usehooks-ts">usehooks-ts</a></pre>
  <br />

<div align="center">
  <sub>Created by <a href="https://github.com/juliencrn">Julien Caron</a> and maintained with ❤️ by an amazing <a href="#contributors">team of developers</a>.</sub>
</div>

</div>

<br />

## 📖 Summary

<!-- HOOKS:START -->

- [`useBoolean()`](https://usehooks-ts.com/react-hook/use-boolean)
- [`useClickAnyWhere()`](https://usehooks-ts.com/react-hook/use-click-any-where)
- [`useCopyToClipboard()`](https://usehooks-ts.com/react-hook/use-copy-to-clipboard)
- [`useCountdown()`](https://usehooks-ts.com/react-hook/use-countdown)
- [`useCounter()`](https://usehooks-ts.com/react-hook/use-counter)
- [`useDarkMode()`](https://usehooks-ts.com/react-hook/use-dark-mode)
- [`useDebounce()`](https://usehooks-ts.com/react-hook/use-debounce)
- [`useDebounceCallback()`](https://usehooks-ts.com/react-hook/use-debounce-callback)
- [`useDebounceValue()`](https://usehooks-ts.com/react-hook/use-debounce-value)
- [`useDocumentTitle()`](https://usehooks-ts.com/react-hook/use-document-title)
- [`useEventCallback()`](https://usehooks-ts.com/react-hook/use-event-callback)
- [`useEventListener()`](https://usehooks-ts.com/react-hook/use-event-listener)
- [`useHover()`](https://usehooks-ts.com/react-hook/use-hover)
- [`useIntersectionObserver()`](https://usehooks-ts.com/react-hook/use-intersection-observer)
- [`useInterval()`](https://usehooks-ts.com/react-hook/use-interval)
- [`useIsClient()`](https://usehooks-ts.com/react-hook/use-is-client)
- [`useIsMounted()`](https://usehooks-ts.com/react-hook/use-is-mounted)
- [`useIsomorphicLayoutEffect()`](https://usehooks-ts.com/react-hook/use-isomorphic-layout-effect)
- [`useLocalStorage()`](https://usehooks-ts.com/react-hook/use-local-storage)
- [`useLockedBody()`](https://usehooks-ts.com/react-hook/use-locked-body)
- [`useMap()`](https://usehooks-ts.com/react-hook/use-map)
- [`useMediaQuery()`](https://usehooks-ts.com/react-hook/use-media-query)
- [`useOnClickOutside()`](https://usehooks-ts.com/react-hook/use-on-click-outside)
- [`useReadLocalStorage()`](https://usehooks-ts.com/react-hook/use-read-local-storage)
- [`useResizeObserver()`](https://usehooks-ts.com/react-hook/use-resize-observer)
- [`useScreen()`](https://usehooks-ts.com/react-hook/use-screen)
- [`useScript()`](https://usehooks-ts.com/react-hook/use-script)
- [`useSessionStorage()`](https://usehooks-ts.com/react-hook/use-session-storage)
- [`useStep()`](https://usehooks-ts.com/react-hook/use-step)
- [`useTernaryDarkMode()`](https://usehooks-ts.com/react-hook/use-ternary-dark-mode)
- [`useTimeout()`](https://usehooks-ts.com/react-hook/use-timeout)
- [`useToggle()`](https://usehooks-ts.com/react-hook/use-toggle)
- [`useUnmount()`](https://usehooks-ts.com/react-hook/use-unmount)
- [`useWindowSize()`](https://usehooks-ts.com/react-hook/use-window-size)

<!-- HOOKS:END -->

## 🤝 How to Contribute

Thanks for wanting to contribute! It's more than welcome 🤗

### Content changes

Most content changes (like fixing a typo) can be made without cloning the repository.
Simply locate the file you wish to change in the GitHub UI,
and click the little edit icon to make your change directly on the GitHub website.

If you need to make any other substantial changes, then follow the project setup steps below.

### Fork to submit a Pull Request (PR)

Before starting, make sure you have the good system dependencies:

- `node@16.x`
- `pnpm@^8`

**Note**: To easily switch node version, consider Node Version Manager (nvm).

Then fork the repository, clone it and install.

```bash
git clone https://github.com/{your_username}/usehooks-ts.git
cd usehooks-ts
pnpm install
```

### Create or update a new hook

```bash
# This command generates boilerplate for new hooks.
# Skip if updating an existed hook.
pnpm gen-hook

# start working
pnpm dev
# or
pnpm dev --filter=usehooks-ts # jest --watch
pnpm dev --filter=www # next dev

# Develop
pnpm build
pnpm lint
pnpm test
```

### How is a hook structured?

```bash
📂 ./packages/usehooks-ts
├── 📂 useHookName
│  ├── 📄 useHookName.demo.tsx # working demo
│  ├── 📝 useHookName.mdx # the documentation content
│  ├── 🧪 useHookName.test.ts # unit tests
│  ├── 📄 useHookName.ts # the hook
│  └── 📄 index.ts
...
```

When the `usehooks-ts` is compiled, only the necessary files are used.
The other files are copied in the documentation website.

**Note**: The demo is used in a different way:

- It's displayed on the website to illustrate how to use the hook.
- It's deployed as a CodeSandbox on build to let final users play with.

## 💚 Backers

Big thanks go to all our backers!

<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/getsentry"><img src="https://avatars.githubusercontent.com/u/1396951?v=4" width="100px;" alt="Sentry"/><br /><sub><b>Sentry</b></sub></a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/KATT"><img src="https://avatars.githubusercontent.com/u/459267?v=4" width="100px;" alt="KATT"/><br /><sub><b>KATT</b></sub></a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/adhiravishankar"><img src="https://avatars.githubusercontent.com/u/3884741?v=4" width="100px;" alt="Adhi Ravishankar"/><br /><sub><b>Adhi Ravishankar</b></sub></a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/great-work-told-is"><img src="https://avatars.githubusercontent.com/u/113922084?v=4" width="100px;" alt="great-work-told-is"/><br /><sub><b>great-work-told-is</b></sub></a></td>
    </tr>
  </tbody>
</table>
<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

## ✨ Contributors

Big thanks go to all our contributors!

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/juliencrn"><img src="https://avatars.githubusercontent.com/u/14028029?v=4?s=80" width="80px;" alt="Julien"/><br /><sub><b>Julien</b></sub></a><br /><a href="#content-juliencrn" title="Content">🖋</a> <a href="https://github.com/juliencrn/usehooks-ts/commits?author=juliencrn" title="Code">💻</a> <a href="#design-juliencrn" title="Design">🎨</a> <a href="#ideas-juliencrn" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/a777med"><img src="https://avatars.githubusercontent.com/u/15968280?v=4?s=80" width="80px;" alt="a777med"/><br /><sub><b>a777med</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=a777med" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://datkira.com/"><img src="https://avatars.githubusercontent.com/u/53250212?v=4?s=80" width="80px;" alt="Nguyen Tien Dat"/><br /><sub><b>Nguyen Tien Dat</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=datkira" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/elifer5000"><img src="https://avatars.githubusercontent.com/u/4311278?v=4?s=80" width="80px;" alt="Elias Cohenca"/><br /><sub><b>Elias Cohenca</b></sub></a><br /><a href="#content-elifer5000" title="Content">🖋</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://joaov.com.br/"><img src="https://avatars.githubusercontent.com/u/17601527?v=4?s=80" width="80px;" alt="João Deroldo"/><br /><sub><b>João Deroldo</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Ajoaoderoldo" title="Bug reports">🐛</a> <a href="https://github.com/juliencrn/usehooks-ts/commits?author=joaoderoldo" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Nishit-Dua"><img src="https://avatars.githubusercontent.com/u/35453301?v=4?s=80" width="80px;" alt="Nishit"/><br /><sub><b>Nishit</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=Nishit-Dua" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/jonkoops"><img src="https://avatars.githubusercontent.com/u/695720?v=4?s=80" width="80px;" alt="Jon Koops"/><br /><sub><b>Jon Koops</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=jonkoops" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/LoneRifle"><img src="https://avatars.githubusercontent.com/u/10572368?v=4?s=80" width="80px;" alt="LoneRifle"/><br /><sub><b>LoneRifle</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=LoneRifle" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/vfonic"><img src="https://avatars.githubusercontent.com/u/67437?v=4?s=80" width="80px;" alt="Viktor"/><br /><sub><b>Viktor</b></sub></a><br /><a href="#ideas-vfonic" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Avfonic" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/bclermont"><img src="https://avatars.githubusercontent.com/u/474302?v=4?s=80" width="80px;" alt="Bruno Clermont"/><br /><sub><b>Bruno Clermont</b></sub></a><br /><a href="#question-bclermont" title="Answering Questions">💬</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/yoannesbourg"><img src="https://avatars.githubusercontent.com/u/73404603?v=4?s=80" width="80px;" alt="yoannesbourg"/><br /><sub><b>yoannesbourg</b></sub></a><br /><a href="#ideas-yoannesbourg" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/strange2x"><img src="https://avatars.githubusercontent.com/u/10759731?v=4?s=80" width="80px;" alt="Strange2x"/><br /><sub><b>Strange2x</b></sub></a><br /><a href="#ideas-strange2x" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/steinybot"><img src="https://avatars.githubusercontent.com/u/4659562?v=4?s=80" width="80px;" alt="Jason Pickens"/><br /><sub><b>Jason Pickens</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Asteinybot" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://smackagency.com/"><img src="https://avatars.githubusercontent.com/u/3469560?v=4?s=80" width="80px;" alt="Sel-Vin Kuik"/><br /><sub><b>Sel-Vin Kuik</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Aselvinkuik" title="Bug reports">🐛</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/isaacalves"><img src="https://avatars.githubusercontent.com/u/1765942?v=4?s=80" width="80px;" alt="isaac"/><br /><sub><b>isaac</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Aisaacalves" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/brunorzn"><img src="https://avatars.githubusercontent.com/u/18266054?v=4?s=80" width="80px;" alt="Bruno RZN"/><br /><sub><b>Bruno RZN</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=brunorzn" title="Code">💻</a> <a href="https://github.com/juliencrn/usehooks-ts/pulls?q=is%3Apr+reviewed-by%3Abrunorzn" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://www.cykeprojects.com/"><img src="https://avatars.githubusercontent.com/u/2979318?v=4?s=80" width="80px;" alt="Nathan Manceaux-Panot"/><br /><sub><b>Nathan Manceaux-Panot</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=Cykelero" title="Code">💻</a> <a href="https://github.com/juliencrn/usehooks-ts/pulls?q=is%3Apr+reviewed-by%3ACykelero" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/meotimdihia"><img src="https://avatars.githubusercontent.com/u/300961?v=4?s=80" width="80px;" alt="Dien Vu"/><br /><sub><b>Dien Vu</b></sub></a><br /><a href="#ideas-meotimdihia" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/olegKusov"><img src="https://avatars.githubusercontent.com/u/28058268?v=4?s=80" width="80px;" alt="Oleg Kusov"/><br /><sub><b>Oleg Kusov</b></sub></a><br /><a href="#ideas-olegKusov" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://mattguy.me/"><img src="https://avatars.githubusercontent.com/u/6647355?v=4?s=80" width="80px;" alt="Matthew Guy"/><br /><sub><b>Matthew Guy</b></sub></a><br /><a href="#ideas-mankittens" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/andrewbihl"><img src="https://avatars.githubusercontent.com/u/16709744?v=4?s=80" width="80px;" alt="andrewbihl"/><br /><sub><b>andrewbihl</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Aandrewbihl" title="Bug reports">🐛</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/lancepollard"><img src="https://avatars.githubusercontent.com/u/86631222?v=4?s=80" width="80px;" alt="lancepollard"/><br /><sub><b>lancepollard</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Alancepollard" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/gmukul01"><img src="https://avatars.githubusercontent.com/u/3636885?v=4?s=80" width="80px;" alt="Mukul Bansal"/><br /><sub><b>Mukul Bansal</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Agmukul01" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://127.0.0.1:8000/"><img src="https://avatars.githubusercontent.com/u/474302?v=4?s=80" width="80px;" alt="Jean-Luc Mongrain sur la Brosse"/><br /><sub><b>Jean-Luc Mongrain sur la Brosse</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=jeanlucmongrain" title="Code">💻</a> <a href="#ideas-jeanlucmongrain" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/n1c"><img src="https://avatars.githubusercontent.com/u/284075?v=4?s=80" width="80px;" alt="Nic"/><br /><sub><b>Nic</b></sub></a><br /><a href="#content-n1c" title="Content">🖋</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://valtism.com/"><img src="https://avatars.githubusercontent.com/u/1286001?v=4?s=80" width="80px;" alt="Dan Wood"/><br /><sub><b>Dan Wood</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=valtism" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://www.sixt.de/"><img src="https://avatars.githubusercontent.com/u/25299148?v=4?s=80" width="80px;" alt="jo wendenbuerger"/><br /><sub><b>jo wendenbuerger</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3AWendenburg" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://nozillium.com/"><img src="https://avatars.githubusercontent.com/u/4774875?v=4?s=80" width="80px;" alt="Andrew Nosenko"/><br /><sub><b>Andrew Nosenko</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Anoseratio" title="Bug reports">🐛</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/CharlieJhonSmith"><img src="https://avatars.githubusercontent.com/u/90845154?v=4?s=80" width="80px;" alt="CharlieJhonSmith"/><br /><sub><b>CharlieJhonSmith</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=CharlieJhonSmith" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://keybase.io/soullivaneuh"><img src="https://avatars.githubusercontent.com/u/1698357?v=4?s=80" width="80px;" alt="Sullivan SENECHAL"/><br /><sub><b>Sullivan SENECHAL</b></sub></a><br /><a href="#ideas-soullivaneuh" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Asoullivaneuh" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/jaslong"><img src="https://avatars.githubusercontent.com/u/797348?v=4?s=80" width="80px;" alt="Jason Long"/><br /><sub><b>Jason Long</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Ajaslong" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/kxm766"><img src="https://avatars.githubusercontent.com/u/88443148?v=4?s=80" width="80px;" alt="kxm766"/><br /><sub><b>kxm766</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Akxm766" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://qlaffont.com/"><img src="https://avatars.githubusercontent.com/u/10044790?v=4?s=80" width="80px;" alt="Quentin"/><br /><sub><b>Quentin</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=qlaffont" title="Code">💻</a> <a href="#ideas-qlaffont" title="Ideas, Planning, & Feedback">🤔</a> <a href="#content-qlaffont" title="Content">🖋</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/ducktordanny"><img src="https://avatars.githubusercontent.com/u/38068717?v=4?s=80" width="80px;" alt="Daniel Lazar"/><br /><sub><b>Daniel Lazar</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=ducktordanny" title="Code">💻</a> <a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Aducktordanny" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/mterrel"><img src="https://avatars.githubusercontent.com/u/17746857?v=4?s=80" width="80px;" alt="Mark Terrel"/><br /><sub><b>Mark Terrel</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Amterrel" title="Bug reports">🐛</a> <a href="https://github.com/juliencrn/usehooks-ts/commits?author=mterrel" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/mendrik"><img src="https://avatars.githubusercontent.com/u/160805?v=4?s=80" width="80px;" alt="Andreas Herd"/><br /><sub><b>Andreas Herd</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Amendrik" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://sonjoydatta.me/"><img src="https://avatars.githubusercontent.com/u/49079726?v=4?s=80" width="80px;" alt="Sonjoy Datta"/><br /><sub><b>Sonjoy Datta</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=sonjoydatta" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/oluckyman"><img src="https://avatars.githubusercontent.com/u/642673?v=4?s=80" width="80px;" alt="Ilya Belsky"/><br /><sub><b>Ilya Belsky</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Aoluckyman" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://jamesbarrett.io/"><img src="https://avatars.githubusercontent.com/u/42980207?v=4?s=80" width="80px;" alt="James Barrett"/><br /><sub><b>James Barrett</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=JamesBarrettDev" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/AbbalYouness"><img src="https://avatars.githubusercontent.com/u/15120524?v=4?s=80" width="80px;" alt="AbbalYouness"/><br /><sub><b>AbbalYouness</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=AbbalYouness" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/DidrikLind"><img src="https://avatars.githubusercontent.com/u/14201715?v=4?s=80" width="80px;" alt="didriklind"/><br /><sub><b>didriklind</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=DidrikLind" title="Code">💻</a> <a href="https://github.com/juliencrn/usehooks-ts/commits?author=DidrikLind" title="Tests">⚠️</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/hexp1989"><img src="https://avatars.githubusercontent.com/u/2241985?v=4?s=80" width="80px;" alt="hexp1989"/><br /><sub><b>hexp1989</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=hexp1989" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://www.linkedin.com/in/alvaro-serrano-rivas/"><img src="https://avatars.githubusercontent.com/u/43758471?v=4?s=80" width="80px;" alt="Alvaro Serrano"/><br /><sub><b>Alvaro Serrano</b></sub></a><br /><a href="#content-alvaroserrrano" title="Content">🖋</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/egehandulger"><img src="https://avatars.githubusercontent.com/u/14878259?v=4?s=80" width="80px;" alt="Egehan Dülger"/><br /><sub><b>Egehan Dülger</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=egehandulger" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/PabloLION"><img src="https://avatars.githubusercontent.com/u/36828324?v=4?s=80" width="80px;" alt="PabloLION"/><br /><sub><b>PabloLION</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3APabloLION" title="Bug reports">🐛</a> <a href="https://github.com/juliencrn/usehooks-ts/commits?author=PabloLION" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://davidsanchez.me/"><img src="https://avatars.githubusercontent.com/u/84061?v=4?s=80" width="80px;" alt="David Sanchez"/><br /><sub><b>David Sanchez</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Aemulienfou" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/AjayTheWizard"><img src="https://avatars.githubusercontent.com/u/92772740?v=4?s=80" width="80px;" alt="Ajay Raja"/><br /><sub><b>Ajay Raja</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3AAjayTheWizard" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://andymerskin.com/"><img src="https://avatars.githubusercontent.com/u/758090?v=4?s=80" width="80px;" alt="Andy Merskin"/><br /><sub><b>Andy Merskin</b></sub></a><br /><a href="#ideas-docmars" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/GrayGalaxy"><img src="https://avatars.githubusercontent.com/u/49820575?v=4?s=80" width="80px;" alt="Avirup Ghosh"/><br /><sub><b>Avirup Ghosh</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=GrayGalaxy" title="Code">💻</a> <a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3AGrayGalaxy" title="Bug reports">🐛</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/tilnea"><img src="https://avatars.githubusercontent.com/u/3692320?v=4?s=80" width="80px;" alt="Sanne Wintrén"/><br /><sub><b>Sanne Wintrén</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Atilnea" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://lacolonia.studio/"><img src="https://avatars.githubusercontent.com/u/1528468?v=4?s=80" width="80px;" alt="Alessandro"/><br /><sub><b>Alessandro</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Aa-barbieri" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/atatarenko"><img src="https://avatars.githubusercontent.com/u/9846273?v=4?s=80" width="80px;" alt="Andrey Tatarenko"/><br /><sub><b>Andrey Tatarenko</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Aatatarenko" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/arusak"><img src="https://avatars.githubusercontent.com/u/4231915?v=4?s=80" width="80px;" alt="Anton Rusak"/><br /><sub><b>Anton Rusak</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Aarusak" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/createdbymahmood"><img src="https://avatars.githubusercontent.com/u/40164360?v=4?s=80" width="80px;" alt="Mahmood Bagheri"/><br /><sub><b>Mahmood Bagheri</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=createdbymahmood" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://wpowner.com/"><img src="https://avatars.githubusercontent.com/u/506491?v=4?s=80" width="80px;" alt="Anver Sadutt"/><br /><sub><b>Anver Sadutt</b></sub></a><br /><a href="#content-anver" title="Content">🖋</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/bogdanailincaipnt"><img src="https://avatars.githubusercontent.com/u/93596663?v=4?s=80" width="80px;" alt="Bogdan Ailincai"/><br /><sub><b>Bogdan Ailincai</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=bogdanailincaipnt" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/SimeonGriggs"><img src="https://avatars.githubusercontent.com/u/9684022?v=4?s=80" width="80px;" alt="Simeon Griggs"/><br /><sub><b>Simeon Griggs</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3ASimeonGriggs" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Kepro"><img src="https://avatars.githubusercontent.com/u/1714370?v=4?s=80" width="80px;" alt="Kepro"/><br /><sub><b>Kepro</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3AKepro" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Jake-Lippert"><img src="https://avatars.githubusercontent.com/u/17753127?v=4?s=80" width="80px;" alt="Jake Lippert"/><br /><sub><b>Jake Lippert</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3AJake-Lippert" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/TunA-Kai"><img src="https://avatars.githubusercontent.com/u/92641762?v=4?s=80" width="80px;" alt="Tu Nguyen Anh"/><br /><sub><b>Tu Nguyen Anh</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3ATunA-Kai" title="Bug reports">🐛</a> <a href="https://github.com/juliencrn/usehooks-ts/commits?author=TunA-Kai" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/skve"><img src="https://avatars.githubusercontent.com/u/47612057?v=4?s=80" width="80px;" alt="Luke Shiels"/><br /><sub><b>Luke Shiels</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Askve" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/SleLLl"><img src="https://avatars.githubusercontent.com/u/66108429?v=4?s=80" width="80px;" alt="Sergei Kolyago"/><br /><sub><b>Sergei Kolyago</b></sub></a><br /><a href="#ideas-SleLLl" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/adhamaa"><img src="https://avatars.githubusercontent.com/u/50027371?v=4?s=80" width="80px;" alt="Adham Akmal Azmi"/><br /><sub><b>Adham Akmal Azmi</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Aadhamaa" title="Bug reports">🐛</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/alex-kowalczyk"><img src="https://avatars.githubusercontent.com/u/7422175?v=4?s=80" width="80px;" alt="Alek Kowalczyk"/><br /><sub><b>Alek Kowalczyk</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Aalex-kowalczyk" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Scalahansolo"><img src="https://avatars.githubusercontent.com/u/4317253?v=4?s=80" width="80px;" alt="Sean Callahan"/><br /><sub><b>Sean Callahan</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3AScalahansolo" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/jbean96"><img src="https://avatars.githubusercontent.com/u/22803097?v=4?s=80" width="80px;" alt="Joshua Bean"/><br /><sub><b>Joshua Bean</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=jbean96" title="Code">💻</a> <a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Ajbean96" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/ZhaoTim"><img src="https://avatars.githubusercontent.com/u/30540533?v=4?s=80" width="80px;" alt="Tim Zhao"/><br /><sub><b>Tim Zhao</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3AZhaoTim" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/patryk-smc"><img src="https://avatars.githubusercontent.com/u/37963339?v=4?s=80" width="80px;" alt="Patrick"/><br /><sub><b>Patrick</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Apatryk-smc" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://bryce.io/"><img src="https://avatars.githubusercontent.com/u/3171252?v=4?s=80" width="80px;" alt="Bryce Dorn"/><br /><sub><b>Bryce Dorn</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=brycedorn" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/angusd3v"><img src="https://avatars.githubusercontent.com/u/52683145?v=4?s=80" width="80px;" alt="angusd3v"/><br /><sub><b>angusd3v</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=angusd3v" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/ddisimone"><img src="https://avatars.githubusercontent.com/u/78792352?v=4?s=80" width="80px;" alt="Davide Di Simone"/><br /><sub><b>Davide Di Simone</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Addisimone" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/jherr"><img src="https://avatars.githubusercontent.com/u/22392?v=4?s=80" width="80px;" alt="Jack Herrington"/><br /><sub><b>Jack Herrington</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Ajherr" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://sharvit.github.io/"><img src="https://avatars.githubusercontent.com/u/1262502?v=4?s=80" width="80px;" alt="Avi Sharvit"/><br /><sub><b>Avi Sharvit</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=sharvit" title="Code">💻</a> <a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Asharvit" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/nmaties"><img src="https://avatars.githubusercontent.com/u/16613184?v=4?s=80" width="80px;" alt="Nicolae Maties"/><br /><sub><b>Nicolae Maties</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Anmaties" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/secretshardul"><img src="https://avatars.githubusercontent.com/u/49580849?v=4?s=80" width="80px;" alt="Shardul Aeer"/><br /><sub><b>Shardul Aeer</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Asecretshardul" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/herlon214"><img src="https://avatars.githubusercontent.com/u/3419441?v=4?s=80" width="80px;" alt="Herlon Aguiar"/><br /><sub><b>Herlon Aguiar</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Aherlon214" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/alexisoney"><img src="https://avatars.githubusercontent.com/u/28802989?v=4?s=80" width="80px;" alt="Alexis Oney"/><br /><sub><b>Alexis Oney</b></sub></a><br /><a href="#content-alexisoney" title="Content">🖋</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://convictional.com/"><img src="https://avatars.githubusercontent.com/u/96080054?v=4?s=80" width="80px;" alt="curtvict"/><br /><sub><b>curtvict</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=curtvict" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/JoshuaCS94"><img src="https://avatars.githubusercontent.com/u/23385700?v=4?s=80" width="80px;" alt="Josué Cortina"/><br /><sub><b>Josué Cortina</b></sub></a><br /><a href="#content-JoshuaCS94" title="Content">🖋</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://katt.dev/"><img src="https://avatars.githubusercontent.com/u/459267?v=4?s=80" width="80px;" alt="Alex / KATT"/><br /><sub><b>Alex / KATT</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=KATT" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/modex98"><img src="https://avatars.githubusercontent.com/u/72814784?v=4?s=80" width="80px;" alt="Mourad EL CADI"/><br /><sub><b>Mourad EL CADI</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=modex98" title="Code">💻</a> <a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Amodex98" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Guesswhoitis"><img src="https://avatars.githubusercontent.com/u/63756285?v=4?s=80" width="80px;" alt="James Hulena"/><br /><sub><b>James Hulena</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3AGuesswhoitis" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://hailwood.nz/"><img src="https://avatars.githubusercontent.com/u/709773?v=4?s=80" width="80px;" alt="Matthew Hailwood"/><br /><sub><b>Matthew Hailwood</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=hailwood" title="Code">💻</a> <a href="https://github.com/juliencrn/usehooks-ts/pulls?q=is%3Apr+reviewed-by%3Ahailwood" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/mike247"><img src="https://avatars.githubusercontent.com/u/676071?v=4?s=80" width="80px;" alt="Michael Norrie"/><br /><sub><b>Michael Norrie</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Amike247" title="Bug reports">🐛</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/valentinpolitov"><img src="https://avatars.githubusercontent.com/u/39585375?v=4?s=80" width="80px;" alt="Valentin Politov"/><br /><sub><b>Valentin Politov</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=valentinpolitov" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/marnusw"><img src="https://avatars.githubusercontent.com/u/971499?v=4?s=80" width="80px;" alt="Marnus Weststrate"/><br /><sub><b>Marnus Weststrate</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=marnusw" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/mancuoj"><img src="https://avatars.githubusercontent.com/u/45707684?v=4?s=80" width="80px;" alt="mancuoj"/><br /><sub><b>mancuoj</b></sub></a><br /><a href="#content-mancuoj" title="Content">🖋</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.chatsumlin.com/"><img src="https://avatars.githubusercontent.com/u/3067479?v=4?s=80" width="80px;" alt="Chat Sumlin"/><br /><sub><b>Chat Sumlin</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=jcsumlin" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/owenshaupt"><img src="https://avatars.githubusercontent.com/u/52288188?v=4?s=80" width="80px;" alt="Owen Haupt"/><br /><sub><b>Owen Haupt</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Aowenshaupt" title="Bug reports">🐛</a> <a href="#content-owenshaupt" title="Content">🖋</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/ubarbaxor"><img src="https://avatars.githubusercontent.com/u/26365493?v=4?s=80" width="80px;" alt="ubarbaxor"/><br /><sub><b>ubarbaxor</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=ubarbaxor" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://michael.mior.ca/"><img src="https://avatars.githubusercontent.com/u/82501?v=4?s=80" width="80px;" alt="Michael Mior"/><br /><sub><b>Michael Mior</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Amichaelmior" title="Bug reports">🐛</a> <a href="#content-michaelmior" title="Content">🖋</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/pkhodaveissi"><img src="https://avatars.githubusercontent.com/u/4170795?v=4?s=80" width="80px;" alt="Pierre"/><br /><sub><b>Pierre</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=pkhodaveissi" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/harrywebdev"><img src="https://avatars.githubusercontent.com/u/3617415?v=4?s=80" width="80px;" alt="Harry B"/><br /><sub><b>Harry B</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Aharrywebdev" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/valyrie97"><img src="https://avatars.githubusercontent.com/u/6365746?v=4?s=80" width="80px;" alt="Valerie"/><br /><sub><b>Valerie</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Avalyrie97" title="Bug reports">🐛</a> <a href="https://github.com/juliencrn/usehooks-ts/commits?author=valyrie97" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://svachon.com/"><img src="https://avatars.githubusercontent.com/u/170197?v=4?s=80" width="80px;" alt="Steven Vachon"/><br /><sub><b>Steven Vachon</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=stevenvachon" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/sskirby"><img src="https://avatars.githubusercontent.com/u/25760?v=4?s=80" width="80px;" alt="Sean Kirby"/><br /><sub><b>Sean Kirby</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=sskirby" title="Tests">⚠️</a> <a href="https://github.com/juliencrn/usehooks-ts/commits?author=sskirby" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/AlecsFarias"><img src="https://avatars.githubusercontent.com/u/91743821?v=4?s=80" width="80px;" alt="Alecsander Farias"/><br /><sub><b>Alecsander Farias</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=AlecsFarias" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://blankparticle.in/"><img src="https://avatars.githubusercontent.com/u/130567419?v=4?s=80" width="80px;" alt="Rahul Mishra"/><br /><sub><b>Rahul Mishra</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=BlankParticle" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/bryantcodesart"><img src="https://avatars.githubusercontent.com/u/14097078?v=4?s=80" width="80px;" alt="Bryant Smith"/><br /><sub><b>Bryant Smith</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=bryantcodesart" title="Code">💻</a> <a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Abryantcodesart" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/RobHannay"><img src="https://avatars.githubusercontent.com/u/609062?v=4?s=80" width="80px;" alt="Rob Hannay"/><br /><sub><b>Rob Hannay</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=RobHannay" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/hooriza"><img src="https://avatars.githubusercontent.com/u/507927?v=4?s=80" width="80px;" alt="Hooriza"/><br /><sub><b>Hooriza</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=hooriza" title="Code">💻</a> <a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Ahooriza" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/ShanSenanayake"><img src="https://avatars.githubusercontent.com/u/8779685?v=4?s=80" width="80px;" alt="ShanSenanayake"/><br /><sub><b>ShanSenanayake</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=ShanSenanayake" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/philipgher"><img src="https://avatars.githubusercontent.com/u/32325241?v=4?s=80" width="80px;" alt="Philip Ghering"/><br /><sub><b>Philip Ghering</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=philipgher" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/ladislasdellinger"><img src="https://avatars.githubusercontent.com/u/111739019?v=4?s=80" width="80px;" alt="Ladislas Dellinger"/><br /><sub><b>Ladislas Dellinger</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=ladislasdellinger" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/TheHaff"><img src="https://avatars.githubusercontent.com/u/2486653?v=4?s=80" width="80px;" alt="Haff"/><br /><sub><b>Haff</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=TheHaff" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/lisandro52"><img src="https://avatars.githubusercontent.com/u/5612241?v=4?s=80" width="80px;" alt="Lisandro"/><br /><sub><b>Lisandro</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=lisandro52" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/amirking59"><img src="https://avatars.githubusercontent.com/u/58273240?v=4?s=80" width="80px;" alt="Amir hossein rezaei"/><br /><sub><b>Amir hossein rezaei</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=amirking59" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/nmacianx"><img src="https://avatars.githubusercontent.com/u/40004186?v=4?s=80" width="80px;" alt="Nicolas Macian"/><br /><sub><b>Nicolas Macian</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Anmacianx" title="Bug reports">🐛</a> <a href="https://github.com/juliencrn/usehooks-ts/commits?author=nmacianx" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://dreamsof.dev/"><img src="https://avatars.githubusercontent.com/u/13162026?v=4?s=80" width="80px;" alt="Nate Forsyth"/><br /><sub><b>Nate Forsyth</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=nateforsyth" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/satelllte"><img src="https://avatars.githubusercontent.com/u/20585619?v=4?s=80" width="80px;" alt="satelllte"/><br /><sub><b>satelllte</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=satelllte" title="Code">💻</a> <a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Asatelllte" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/fedemp"><img src="https://avatars.githubusercontent.com/u/735314?v=4?s=80" width="80px;" alt="Federico Panico"/><br /><sub><b>Federico Panico</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=fedemp" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/iamwillnbcu"><img src="https://avatars.githubusercontent.com/u/137317773?v=4?s=80" width="80px;" alt="William Pei Yuan"/><br /><sub><b>William Pei Yuan</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=iamwillnbcu" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="http://www.gazeta-cu-anunturi.ro/"><img src="https://avatars.githubusercontent.com/u/757999?v=4?s=80" width="80px;" alt="Mihai"/><br /><sub><b>Mihai</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=DarkAng3L" title="Code">💻</a> <a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3ADarkAng3L" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://habib.ogunsola.me/"><img src="https://avatars.githubusercontent.com/u/39172573?v=4?s=80" width="80px;" alt="Habib Ogunsola"/><br /><sub><b>Habib Ogunsola</b></sub></a><br /><a href="#content-ogunsolahabib" title="Content">🖋</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://ashfurrow.com/"><img src="https://avatars.githubusercontent.com/u/498212?v=4?s=80" width="80px;" alt="Ash Furrow"/><br /><sub><b>Ash Furrow</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=ashfurrow" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://turus.ro/"><img src="https://avatars.githubusercontent.com/u/32390499?v=4?s=80" width="80px;" alt="Daniel Turuș"/><br /><sub><b>Daniel Turuș</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=danielturus" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.linkedin.com/in/rahulchaudhary2244/"><img src="https://avatars.githubusercontent.com/u/54467972?v=4?s=80" width="80px;" alt="Rahul Chaudhary"/><br /><sub><b>Rahul Chaudhary</b></sub></a><br /><a href="#content-rahulchaudhary2244" title="Content">🖋</a> <a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Arahulchaudhary2244" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Joshyahweh"><img src="https://avatars.githubusercontent.com/u/61137067?v=4?s=80" width="80px;" alt="Joshua Ojoawo"/><br /><sub><b>Joshua Ojoawo</b></sub></a><br /><a href="#ideas-Joshyahweh" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3AJoshyahweh" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://jackdh.com/"><img src="https://avatars.githubusercontent.com/u/1907451?v=4?s=80" width="80px;" alt="Jack"/><br /><sub><b>Jack</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=jackdh" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/jonlinkens"><img src="https://avatars.githubusercontent.com/u/20417521?v=4?s=80" width="80px;" alt="Jon Linkens"/><br /><sub><b>Jon Linkens</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=jonlinkens" title="Code">💻</a> <a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Ajonlinkens" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://velog.io/@ojj1123"><img src="https://avatars.githubusercontent.com/u/33178048?v=4?s=80" width="80px;" alt="Jeongjin Oh"/><br /><sub><b>Jeongjin Oh</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Aojj1123" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/tli26"><img src="https://avatars.githubusercontent.com/u/114947190?v=4?s=80" width="80px;" alt="Tianning Li"/><br /><sub><b>Tianning Li</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=tli26" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://larsartmann.com/"><img src="https://avatars.githubusercontent.com/u/23587853?v=4?s=80" width="80px;" alt="Lars Artmann"/><br /><sub><b>Lars Artmann</b></sub></a><br /><a href="#content-LarsArtmann" title="Content">🖋</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/KBobovskiy"><img src="https://avatars.githubusercontent.com/u/35502578?v=4?s=80" width="80px;" alt="KBobovskiy"/><br /><sub><b>KBobovskiy</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=KBobovskiy" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/ryngonzalez"><img src="https://avatars.githubusercontent.com/u/635300?v=4?s=80" width="80px;" alt="✨ Kathryn Gonzalez ✨"/><br /><sub><b>✨ Kathryn Gonzalez ✨</b></sub></a><br /><a href="#content-ryngonzalez" title="Content">🖋</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/slavik-chapelskyi"><img src="https://avatars.githubusercontent.com/u/33541009?v=4?s=80" width="80px;" alt="Yaroslav Chapelskyi"/><br /><sub><b>Yaroslav Chapelskyi</b></sub></a><br /><a href="#content-slavik-chapelskyi" title="Content">🖋</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/sverps"><img src="https://avatars.githubusercontent.com/u/15879327?v=4?s=80" width="80px;" alt="Samuel Van Erps"/><br /><sub><b>Samuel Van Erps</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/pulls?q=is%3Apr+reviewed-by%3Asverps" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/ojolowoblue"><img src="https://avatars.githubusercontent.com/u/104099474?v=4?s=80" width="80px;" alt="ojolowoblue"/><br /><sub><b>ojolowoblue</b></sub></a><br /><a href="#content-ojolowoblue" title="Content">🖋</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://short.io/"><img src="https://avatars.githubusercontent.com/u/75169?v=4?s=80" width="80px;" alt="Andrii Kostenko"/><br /><sub><b>Andrii Kostenko</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=gugu" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/AkeemAllen"><img src="https://avatars.githubusercontent.com/u/32404761?v=4?s=80" width="80px;" alt="Akeem Allen"/><br /><sub><b>Akeem Allen</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=AkeemAllen" title="Code">💻</a> <a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3AAkeemAllen" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/trongbinh15"><img src="https://avatars.githubusercontent.com/u/43725147?v=4?s=80" width="80px;" alt="trongbinhnguyen"/><br /><sub><b>trongbinhnguyen</b></sub></a><br /><a href="#content-trongbinh15" title="Content">🖋</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://lawlesx.vercel.app/"><img src="https://avatars.githubusercontent.com/u/52166437?v=4?s=80" width="80px;" alt="Aniruddha Sil"/><br /><sub><b>Aniruddha Sil</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=lawlesx" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/okinawaa"><img src="https://avatars.githubusercontent.com/u/69495129?v=4?s=80" width="80px;" alt="박찬혁"/><br /><sub><b>박찬혁</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/pulls?q=is%3Apr+reviewed-by%3Aokinawaa" title="Reviewed Pull Requests">👀</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://anishchhetri.com.np/"><img src="https://avatars.githubusercontent.com/u/98446102?v=4?s=80" width="80px;" alt="Anish"/><br /><sub><b>Anish</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=novanish" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://hutri.fi/"><img src="https://avatars.githubusercontent.com/u/55588133?v=4?s=80" width="80px;" alt="Hugo Hutri"/><br /><sub><b>Hugo Hutri</b></sub></a><br /><a href="#content-hugohutri" title="Content">🖋</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://balzguenat.ch/"><img src="https://avatars.githubusercontent.com/u/6719014?v=4?s=80" width="80px;" alt="Balz Guenat"/><br /><sub><b>Balz Guenat</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=BalzGuenat" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/ottergeorge"><img src="https://avatars.githubusercontent.com/u/108759685?v=4?s=80" width="80px;" alt="OtterGeorge"/><br /><sub><b>OtterGeorge</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=ottergeorge" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/samay-rgb"><img src="https://avatars.githubusercontent.com/u/73112080?v=4?s=80" width="80px;" alt="Samay Sagar"/><br /><sub><b>Samay Sagar</b></sub></a><br /><a href="#content-samay-rgb" title="Content">🖋</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/pedrobslisboa"><img src="https://avatars.githubusercontent.com/u/35539594?v=4?s=80" width="80px;" alt="Pedro Lisboa"/><br /><sub><b>Pedro Lisboa</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Apedrobslisboa" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/henriqemalheiros"><img src="https://avatars.githubusercontent.com/u/23730762?v=4?s=80" width="80px;" alt="Henrique Malheiros"/><br /><sub><b>Henrique Malheiros</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Ahenriqemalheiros" title="Bug reports">🐛</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="http://www.unfocus.com/"><img src="https://avatars.githubusercontent.com/u/245825?v=4?s=80" width="80px;" alt="Kevin Newman"/><br /><sub><b>Kevin Newman</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=CaptainN" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/a503189"><img src="https://avatars.githubusercontent.com/u/28802989?v=4?s=80" width="80px;" alt="a503189"/><br /><sub><b>a503189</b></sub></a><br /><a href="#content-a503189" title="Content">🖋</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://t.me/mouradelcadi"><img src="https://avatars.githubusercontent.com/u/72814784?v=4?s=80" width="80px;" alt="Mourad EL CADI"/><br /><sub><b>Mourad EL CADI</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=mod7ex" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Lop3sPedro"><img src="https://avatars.githubusercontent.com/u/89090945?v=4?s=80" width="80px;" alt="Pedro Henrique Lopes"/><br /><sub><b>Pedro Henrique Lopes</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=Lop3sPedro" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/danbiilee"><img src="https://avatars.githubusercontent.com/u/53761241?v=4?s=80" width="80px;" alt="Danbi Lee"/><br /><sub><b>Danbi Lee</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=danbiilee" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/cojennin"><img src="https://avatars.githubusercontent.com/u/1888152?v=4?s=80" width="80px;" alt="Connor Jennings"/><br /><sub><b>Connor Jennings</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=cojennin" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/lgxm3z"><img src="https://avatars.githubusercontent.com/u/28831375?v=4?s=80" width="80px;" alt="Lucas Gomes"/><br /><sub><b>Lucas Gomes</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Algxm3z" title="Bug reports">🐛</a> <a href="https://github.com/juliencrn/usehooks-ts/commits?author=lgxm3z" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/zaggino"><img src="https://avatars.githubusercontent.com/u/1067319?v=4?s=80" width="80px;" alt="Martin Zagora"/><br /><sub><b>Martin Zagora</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=zaggino" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/kvdo2"><img src="https://avatars.githubusercontent.com/u/78251524?v=4?s=80" width="80px;" alt="KvD"/><br /><sub><b>KvD</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=kvdo2" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/SupraSmooth"><img src="https://avatars.githubusercontent.com/u/18029247?v=4?s=80" width="80px;" alt="Alex"/><br /><sub><b>Alex</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=SupraSmooth" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/kaceycleveland"><img src="https://avatars.githubusercontent.com/u/88064187?v=4?s=80" width="80px;" alt="Kacey Cleveland"/><br /><sub><b>Kacey Cleveland</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/pulls?q=is%3Apr+reviewed-by%3Akaceycleveland" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/oviirup"><img src="https://avatars.githubusercontent.com/u/49820575?v=4?s=80" width="80px;" alt="Avirup Ghosh"/><br /><sub><b>Avirup Ghosh</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Aoviirup" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/yabbal"><img src="https://avatars.githubusercontent.com/u/15120524?v=4?s=80" width="80px;" alt="yabbal"/><br /><sub><b>yabbal</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=yabbal" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://patik.com/"><img src="https://avatars.githubusercontent.com/u/262137?v=4?s=80" width="80px;" alt="Craig Patik"/><br /><sub><b>Craig Patik</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Apatik" title="Bug reports">🐛</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Silverium"><img src="https://avatars.githubusercontent.com/u/10578392?v=4?s=80" width="80px;" alt="Soldeplata Saketos Candela"/><br /><sub><b>Soldeplata Saketos Candela</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=Silverium" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/TENDOUZHI"><img src="https://avatars.githubusercontent.com/u/82806526?v=4?s=80" width="80px;" alt="TENDOUZHI"/><br /><sub><b>TENDOUZHI</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3ATENDOUZHI" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/wachulski"><img src="https://avatars.githubusercontent.com/u/1669844?v=4?s=80" width="80px;" alt="Marcin Wachulski"/><br /><sub><b>Marcin Wachulski</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Awachulski" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://salmans.work/"><img src="https://avatars.githubusercontent.com/u/15085416?v=4?s=80" width="80px;" alt="Salman Fazal"/><br /><sub><b>Salman Fazal</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Asalmanfazal01" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/shrugs"><img src="https://avatars.githubusercontent.com/u/1535001?v=4?s=80" width="80px;" alt="shrugs"/><br /><sub><b>shrugs</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Ashrugs" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Hyodori04"><img src="https://avatars.githubusercontent.com/u/57362573?v=4?s=80" width="80px;" alt="hyodori"/><br /><sub><b>hyodori</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3AHyodori04" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/eleazareramos"><img src="https://avatars.githubusercontent.com/u/25910203?v=4?s=80" width="80px;" alt="Eleazar “E” Ramos"/><br /><sub><b>Eleazar “E” Ramos</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Aeleazareramos" title="Bug reports">🐛</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/retnag"><img src="https://avatars.githubusercontent.com/u/18302198?v=4?s=80" width="80px;" alt="retnag"/><br /><sub><b>retnag</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Aretnag" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://jaeyoung.dev/"><img src="https://avatars.githubusercontent.com/u/55247450?v=4?s=80" width="80px;" alt="J young Lee"/><br /><sub><b>J young Lee</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Abeefiker" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/fiws"><img src="https://avatars.githubusercontent.com/u/3409958?v=4?s=80" width="80px;" alt="Filip Weiss"/><br /><sub><b>Filip Weiss</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Afiws" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://mariusgundersen.net/"><img src="https://avatars.githubusercontent.com/u/464152?v=4?s=80" width="80px;" alt="Marius Gundersen"/><br /><sub><b>Marius Gundersen</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3AmariusGundersen" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/VenomFate-619"><img src="https://avatars.githubusercontent.com/u/67755128?v=4?s=80" width="80px;" alt="Syed Aman Ali"/><br /><sub><b>Syed Aman Ali</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3AVenomFate-619" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://ingadi.work/"><img src="https://avatars.githubusercontent.com/u/6121225?v=4?s=80" width="80px;" alt="Axel Ingadi"/><br /><sub><b>Axel Ingadi</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Aingadi" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/andyjphu"><img src="https://avatars.githubusercontent.com/u/51890861?v=4?s=80" width="80px;" alt="AndyP"/><br /><sub><b>AndyP</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Aandyjphu" title="Bug reports">🐛</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/ishanVaghasiya"><img src="https://avatars.githubusercontent.com/u/98661936?v=4?s=80" width="80px;" alt="ishanVaghasiya"/><br /><sub><b>ishanVaghasiya</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3AishanVaghasiya" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/nico-martinucci"><img src="https://avatars.githubusercontent.com/u/80868741?v=4?s=80" width="80px;" alt="Nico Martinucci"/><br /><sub><b>Nico Martinucci</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Anico-martinucci" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/technophile-04"><img src="https://avatars.githubusercontent.com/u/80153681?v=4?s=80" width="80px;" alt="Shiv Bhonde &#124; shivbhonde.eth"/><br /><sub><b>Shiv Bhonde &#124; shivbhonde.eth</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Atechnophile-04" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/fritzmonkey"><img src="https://avatars.githubusercontent.com/u/10103840?v=4?s=80" width="80px;" alt="fritzmonkey"/><br /><sub><b>fritzmonkey</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Afritzmonkey" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/rrmesquita"><img src="https://avatars.githubusercontent.com/u/30835404?v=4?s=80" width="80px;" alt="Rodrigo Mesquita"/><br /><sub><b>Rodrigo Mesquita</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Arrmesquita" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://moshe.io/"><img src="https://avatars.githubusercontent.com/u/534911?v=4?s=80" width="80px;" alt="Moshe Simantov"/><br /><sub><b>Moshe Simantov</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Amoshest" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/BekaArabidze98"><img src="https://avatars.githubusercontent.com/u/122085038?v=4?s=80" width="80px;" alt="Beka"/><br /><sub><b>Beka</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3ABekaArabidze98" title="Bug reports">🐛</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/abdofola"><img src="https://avatars.githubusercontent.com/u/30251052?v=4?s=80" width="80px;" alt="Abdallah Alkaser"/><br /><sub><b>Abdallah Alkaser</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Aabdofola" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/CarlosNZ"><img src="https://avatars.githubusercontent.com/u/5456533?v=4?s=80" width="80px;" alt="Carl Smith"/><br /><sub><b>Carl Smith</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3ACarlosNZ" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/ogroppo"><img src="https://avatars.githubusercontent.com/u/4820803?v=4?s=80" width="80px;" alt="Orlando Groppo"/><br /><sub><b>Orlando Groppo</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Aogroppo" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/thany"><img src="https://avatars.githubusercontent.com/u/152227?v=4?s=80" width="80px;" alt="Martĳn Saly"/><br /><sub><b>Martĳn Saly</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Athany" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://quinn.io/"><img src="https://avatars.githubusercontent.com/u/3764?v=4?s=80" width="80px;" alt="Quinn Shanahan"/><br /><sub><b>Quinn Shanahan</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Aquinn" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://antoinek.fr/"><img src="https://avatars.githubusercontent.com/u/54948363?v=4?s=80" width="80px;" alt="Antoine Kingue"/><br /><sub><b>Antoine Kingue</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3AAntoineKM" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/zanzlender"><img src="https://avatars.githubusercontent.com/u/44570474?v=4?s=80" width="80px;" alt="Žan Žlender"/><br /><sub><b>Žan Žlender</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Azanzlender" title="Bug reports">🐛</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/sebadom"><img src="https://avatars.githubusercontent.com/u/3877952?v=4?s=80" width="80px;" alt="Sebastian Dominguez"/><br /><sub><b>Sebastian Dominguez</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Asebadom" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/jmc420"><img src="https://avatars.githubusercontent.com/u/11723529?v=4?s=80" width="80px;" alt="James Cowan"/><br /><sub><b>James Cowan</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Ajmc420" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/bayraak"><img src="https://avatars.githubusercontent.com/u/10470072?v=4?s=80" width="80px;" alt="Bayram Ali Basgul"/><br /><sub><b>Bayram Ali Basgul</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Abayraak" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://wyatt.castaneda.family/"><img src="https://avatars.githubusercontent.com/u/17957937?v=4?s=80" width="80px;" alt="Wyatt Castaneda"/><br /><sub><b>Wyatt Castaneda</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3AWyattCast44" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/tsnevillecom"><img src="https://avatars.githubusercontent.com/u/3151454?v=4?s=80" width="80px;" alt="Tim Neville"/><br /><sub><b>Tim Neville</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Atsnevillecom" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/shoooe"><img src="https://avatars.githubusercontent.com/u/733227?v=4?s=80" width="80px;" alt="Thomas Pigarelli"/><br /><sub><b>Thomas Pigarelli</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Ashoooe" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/jherdman"><img src="https://avatars.githubusercontent.com/u/3300?v=4?s=80" width="80px;" alt="James Herdman"/><br /><sub><b>James Herdman</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Ajherdman" title="Bug reports">🐛</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/pociej"><img src="https://avatars.githubusercontent.com/u/3854675?v=4?s=80" width="80px;" alt="Grzegorz Pociejewski"/><br /><sub><b>Grzegorz Pociejewski</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Apociej" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/flyon"><img src="https://avatars.githubusercontent.com/u/341567?v=4?s=80" width="80px;" alt="René Verheij"/><br /><sub><b>René Verheij</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Aflyon" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/PatrykKuniczak"><img src="https://avatars.githubusercontent.com/u/64608510?v=4?s=80" width="80px;" alt="PatrykKuniczak"/><br /><sub><b>PatrykKuniczak</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3APatrykKuniczak" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://cromodder.github.io/"><img src="https://avatars.githubusercontent.com/u/7691110?v=4?s=80" width="80px;" alt="Paolo Božac"/><br /><sub><b>Paolo Božac</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3ACroModder" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/reinos"><img src="https://avatars.githubusercontent.com/u/633730?v=4?s=80" width="80px;" alt="Rein"/><br /><sub><b>Rein</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Areinos" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/FloorianB"><img src="https://avatars.githubusercontent.com/u/110407858?v=4?s=80" width="80px;" alt="FloorianB"/><br /><sub><b>FloorianB</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3AFloorianB" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/xuanhung1509"><img src="https://avatars.githubusercontent.com/u/89293664?v=4?s=80" width="80px;" alt="Xuan Hung"/><br /><sub><b>Xuan Hung</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Axuanhung1509" title="Bug reports">🐛</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://monawwar.io/"><img src="https://avatars.githubusercontent.com/u/31907722?v=4?s=80" width="80px;" alt="Monawwar Abdullah"/><br /><sub><b>Monawwar Abdullah</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Amxvsh" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/haroldo-ok"><img src="https://avatars.githubusercontent.com/u/1457465?v=4?s=80" width="80px;" alt="Haroldo de Oliveira Pinheiro"/><br /><sub><b>Haroldo de Oliveira Pinheiro</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Aharoldo-ok" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://portfoliobytamjid.vercel.app/"><img src="https://avatars.githubusercontent.com/u/57794102?v=4?s=80" width="80px;" alt="Tamjid Ahmed"/><br /><sub><b>Tamjid Ahmed</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3ATamjidAhmed10" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/jv-lopez"><img src="https://avatars.githubusercontent.com/u/93750956?v=4?s=80" width="80px;" alt="jv-lopez"/><br /><sub><b>jv-lopez</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Ajv-lopez" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://macr.ae/"><img src="https://avatars.githubusercontent.com/u/472830?v=4?s=80" width="80px;" alt="Callum Macrae"/><br /><sub><b>Callum Macrae</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Acallumacrae" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/0529bill"><img src="https://avatars.githubusercontent.com/u/62455148?v=4?s=80" width="80px;" alt="bywater529"/><br /><sub><b>bywater529</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3A0529bill" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/kevinxh"><img src="https://avatars.githubusercontent.com/u/10948652?v=4?s=80" width="80px;" alt="Kevin He"/><br /><sub><b>Kevin He</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Akevinxh" title="Bug reports">🐛</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/FredericoGauz"><img src="https://avatars.githubusercontent.com/u/18327882?v=4?s=80" width="80px;" alt="FredericoGauz"/><br /><sub><b>FredericoGauz</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3AFredericoGauz" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.jonlemofficial.com/"><img src="https://avatars.githubusercontent.com/u/38771842?v=4?s=80" width="80px;" alt="Jonathan "JonLem" Lemos"/><br /><sub><b>Jonathan "JonLem" Lemos</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3AJonLemOfficial" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/xegulon"><img src="https://avatars.githubusercontent.com/u/74178038?v=4?s=80" width="80px;" alt="Xegulon"/><br /><sub><b>Xegulon</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Axegulon" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/TomSmedley"><img src="https://avatars.githubusercontent.com/u/95056193?v=4?s=80" width="80px;" alt="Tom Smedley"/><br /><sub><b>Tom Smedley</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3ATomSmedley" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/lightbluepoppy"><img src="https://avatars.githubusercontent.com/u/65863981?v=4?s=80" width="80px;" alt="lightbluepoppy"/><br /><sub><b>lightbluepoppy</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Alightbluepoppy" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Dchole"><img src="https://avatars.githubusercontent.com/u/47068381?v=4?s=80" width="80px;" alt="Derek Oware"/><br /><sub><b>Derek Oware</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3ADchole" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://fragmentedthought.com/"><img src="https://avatars.githubusercontent.com/u/12085479?v=4?s=80" width="80px;" alt="Lance Gliser"/><br /><sub><b>Lance Gliser</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Alancegliser" title="Bug reports">🐛</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/lewxdev"><img src="https://avatars.githubusercontent.com/u/6710419?v=4?s=80" width="80px;" alt="J. Lewis"/><br /><sub><b>J. Lewis</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Alewxdev" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/yairy"><img src="https://avatars.githubusercontent.com/u/3206243?v=4?s=80" width="80px;" alt="Yair"/><br /><sub><b>Yair</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Ayairy" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://firecamp.dev/"><img src="https://avatars.githubusercontent.com/u/5078921?v=4?s=80" width="80px;" alt="Nishchit"/><br /><sub><b>Nishchit</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3ANishchit14" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Nejjer"><img src="https://avatars.githubusercontent.com/u/80219537?v=4?s=80" width="80px;" alt="Devofy"/><br /><sub><b>Devofy</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3ANejjer" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://joshguyette.com/"><img src="https://avatars.githubusercontent.com/u/28668902?v=4?s=80" width="80px;" alt="Josh Guyette"/><br /><sub><b>Josh Guyette</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Anightness" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/dora-ljh"><img src="https://avatars.githubusercontent.com/u/35205701?v=4?s=80" width="80px;" alt="Dora Li"/><br /><sub><b>Dora Li</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Adora-ljh" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/kg-currenxie"><img src="https://avatars.githubusercontent.com/u/48229166?v=4?s=80" width="80px;" alt="Kristian Gerardsson"/><br /><sub><b>Kristian Gerardsson</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Akg-currenxie" title="Bug reports">🐛</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/jdpt0"><img src="https://avatars.githubusercontent.com/u/19761394?v=4?s=80" width="80px;" alt="James Powell"/><br /><sub><b>James Powell</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Ajdpt0" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.linkedin.com/in/boaz-poolman-662162115/"><img src="https://avatars.githubusercontent.com/u/9551934?v=4?s=80" width="80px;" alt="Boaz Poolman"/><br /><sub><b>Boaz Poolman</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Aboazpoolman" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/roker15"><img src="https://avatars.githubusercontent.com/u/59526869?v=4?s=80" width="80px;" alt="roker15"/><br /><sub><b>roker15</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Aroker15" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/fadhilx"><img src="https://avatars.githubusercontent.com/u/15516786?v=4?s=80" width="80px;" alt="Fadhil Ahmad"/><br /><sub><b>Fadhil Ahmad</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Afadhilx" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Chandler-Zhu"><img src="https://avatars.githubusercontent.com/u/61914365?v=4?s=80" width="80px;" alt="Chandler-Zhu"/><br /><sub><b>Chandler-Zhu</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3AChandler-Zhu" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/nixjs"><img src="https://avatars.githubusercontent.com/u/23132483?v=4?s=80" width="80px;" alt="Nghi Nguyen"/><br /><sub><b>Nghi Nguyen</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Anixjs" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/ShravanSunder"><img src="https://avatars.githubusercontent.com/u/5294949?v=4?s=80" width="80px;" alt="Shravan Sunder"/><br /><sub><b>Shravan Sunder</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3AShravanSunder" title="Bug reports">🐛</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Johannes5"><img src="https://avatars.githubusercontent.com/u/14299835?v=4?s=80" width="80px;" alt="Johannes5"/><br /><sub><b>Johannes5</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3AJohannes5" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/sebahhpeya"><img src="https://avatars.githubusercontent.com/u/93996817?v=4?s=80" width="80px;" alt="sebahhpeya"/><br /><sub><b>sebahhpeya</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Asebahhpeya" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://onezero.co.il/"><img src="https://avatars.githubusercontent.com/u/45389557?v=4?s=80" width="80px;" alt="Or Nakash"/><br /><sub><b>Or Nakash</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Aornakash" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/hepiyellow"><img src="https://avatars.githubusercontent.com/u/6338722?v=4?s=80" width="80px;" alt="Erez Makavy"/><br /><sub><b>Erez Makavy</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Ahepiyellow" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://andymerskin.com/"><img src="https://avatars.githubusercontent.com/u/758090?v=4?s=80" width="80px;" alt="Andy Merskin"/><br /><sub><b>Andy Merskin</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Aandymerskin" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/chainalert-bot"><img src="https://avatars.githubusercontent.com/u/95303823?v=4?s=80" width="80px;" alt="ChainAlert Bot"/><br /><sub><b>ChainAlert Bot</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Achainalert-bot" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/tmdesigned"><img src="https://avatars.githubusercontent.com/u/3608018?v=4?s=80" width="80px;" alt="Taylor Morgan"/><br /><sub><b>Taylor Morgan</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Atmdesigned" title="Bug reports">🐛</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://abkabioye.me/"><img src="https://avatars.githubusercontent.com/u/18709032?v=4?s=80" width="80px;" alt="wisdomabioye"/><br /><sub><b>wisdomabioye</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Awisdomabioye" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://www.samtheq.com"><img src="https://avatars.githubusercontent.com/u/51345689?v=4?s=80" width="80px;" alt="Samuel Quiñones"/><br /><sub><b>Samuel Quiñones</b></sub></a><br /><a href="#ideas-SamuelQuinones" title="Ideas, Planning, & Feedback">🤔</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification ([emoji key](https://allcontributors.org/docs/en/emoji-key)). Contributions of any kind welcome!

## 📝 License

This project is [MIT](https://github.com/juliencrn/usehooks-ts/blob/master/LICENSE) licensed.

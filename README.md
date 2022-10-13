<img src="./screenshot.png" alt="usehooks-ts banner" align="center" />

<br />

<div align="center">
<h1>usehooks-ts</h1>

<div>React hook library, ready to use, written in Typescript.</div>

<br />

<!-- Badges -->

[![License](https://badgen.net/badge/License/MIT/blue)](https://github.com/juliencrn/usehooks-ts/blob/master/LICENSE)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/usehooks-ts)
![npm](https://img.shields.io/npm/v/usehooks-ts)<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-88-orange.svg?style=flat-square)](#contributors-)
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
- [`useDocumentTitle()`](https://usehooks-ts.com/react-hook/use-document-title)
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
- [`useIsomorphicLayoutEffect()`](https://usehooks-ts.com/react-hook/use-isomorphic-layout-effect)
- [`useLocalStorage()`](https://usehooks-ts.com/react-hook/use-local-storage)
- [`useLockedBody()`](https://usehooks-ts.com/react-hook/use-locked-body)
- [`useMap()`](https://usehooks-ts.com/react-hook/use-map)
- [`useMediaQuery()`](https://usehooks-ts.com/react-hook/use-media-query)
- [`useOnClickOutside()`](https://usehooks-ts.com/react-hook/use-on-click-outside)
- [`useReadLocalStorage()`](https://usehooks-ts.com/react-hook/use-read-local-storage)
- [`useScreen()`](https://usehooks-ts.com/react-hook/use-screen)
- [`useScript()`](https://usehooks-ts.com/react-hook/use-script)
- [`useSessionStorage()`](https://usehooks-ts.com/react-hook/use-session-storage)
- [`useSsr()`](https://usehooks-ts.com/react-hook/use-ssr)
- [`useStep()`](https://usehooks-ts.com/react-hook/use-step)
- [`useTernaryDarkMode()`](https://usehooks-ts.com/react-hook/use-ternary-dark-mode)
- [`useTimeout()`](https://usehooks-ts.com/react-hook/use-timeout)
- [`useToggle()`](https://usehooks-ts.com/react-hook/use-toggle)
- [`useUpdateEffect()`](https://usehooks-ts.com/react-hook/use-update-effect)
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
- `npm@^8`

**Note**: To easily switch node version, consider Node Version Manager (nvm).

Then fork the repository, clone it and install.

```bash
git clone https://github.com/{your_username}/usehooks-ts.git
cd usehooks-ts
npm install
```

### Create or update a new hook

```bash
# This command generates boilerplate for new hooks.
# Skip if updating an existed hook.
npm run plop

# Then develop the hook (aka test:watch)
npm run dev

# Once the hooks is ready
# Launch the documentation website
# Note: to build the website, you have to compile the usehooks-ts lib
# first, which create website content in the `website/generated` folder,
# used by Gatsby to create pages
cd website
npm install
npm run start

# Before commit: exec types-checking, linters and tests
cd ..
npm run test
```

### How is structured a hook ?

```bash
📂 ./src
├── 📂 useHookName
│  ├── 📄 useHookName.demo.tsx # working demo
│  ├── 📝 useHookName.mdx # the documentation content
│  ├── 🧪 useHookName.test.ts # unit tests
│  └── 📄 useHookName.ts # the hook
...
```

When the `usehooks-ts` is compiled, only the necessary files are used.
The other files are copied in the documentation website.

**Note**: The demo is used different way:

- It's displayed on the website to illustrate how to use the hook.
- It's deployed as a CodeSandbox on build to let final users play with.

## ✨ Contributors

Big thanks goes to these wonderful people ❤️

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
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
      <td align="center"><a href="https://keybase.io/soullivaneuh"><img src="https://avatars.githubusercontent.com/u/1698357?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Sullivan SENECHAL</b></sub></a><br /><a href="#ideas-soullivaneuh" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Asoullivaneuh" title="Bug reports">🐛</a></td>
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
      <td align="center"><a href="https://github.com/PabloLION"><img src="https://avatars.githubusercontent.com/u/36828324?v=4?s=80" width="80px;" alt=""/><br /><sub><b>PabloLION</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3APabloLION" title="Bug reports">🐛</a> <a href="https://github.com/juliencrn/usehooks-ts/commits?author=PabloLION" title="Code">💻</a></td>
      <td align="center"><a href="https://davidsanchez.me/"><img src="https://avatars.githubusercontent.com/u/84061?v=4?s=80" width="80px;" alt=""/><br /><sub><b>David Sanchez</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Aemulienfou" title="Bug reports">🐛</a></td>
      <td align="center"><a href="https://github.com/AjayTheWizard"><img src="https://avatars.githubusercontent.com/u/92772740?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Ajay Raja</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3AAjayTheWizard" title="Bug reports">🐛</a></td>
      <td align="center"><a href="http://andymerskin.com/"><img src="https://avatars.githubusercontent.com/u/758090?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Andy Merskin</b></sub></a><br /><a href="#ideas-docmars" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center"><a href="https://github.com/GrayGalaxy"><img src="https://avatars.githubusercontent.com/u/49820575?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Avirup Ghosh</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=GrayGalaxy" title="Code">💻</a> <a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3AGrayGalaxy" title="Bug reports">🐛</a></td>
    </tr>
    <tr>
      <td align="center"><a href="https://github.com/tilnea"><img src="https://avatars.githubusercontent.com/u/3692320?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Sanne Wintrén</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Atilnea" title="Bug reports">🐛</a></td>
      <td align="center"><a href="http://lacolonia.studio/"><img src="https://avatars.githubusercontent.com/u/1528468?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Alessandro</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Aa-barbieri" title="Bug reports">🐛</a></td>
      <td align="center"><a href="https://github.com/atatarenko"><img src="https://avatars.githubusercontent.com/u/9846273?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Andrey Tatarenko</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Aatatarenko" title="Bug reports">🐛</a></td>
      <td align="center"><a href="https://github.com/arusak"><img src="https://avatars.githubusercontent.com/u/4231915?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Anton Rusak</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Aarusak" title="Bug reports">🐛</a></td>
      <td align="center"><a href="https://github.com/createdbymahmood"><img src="https://avatars.githubusercontent.com/u/40164360?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Mahmood Bagheri</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=createdbymahmood" title="Code">💻</a></td>
      <td align="center"><a href="https://wpowner.com/"><img src="https://avatars.githubusercontent.com/u/506491?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Anver Sadutt</b></sub></a><br /><a href="#content-anver" title="Content">🖋</a></td>
      <td align="center"><a href="https://github.com/bogdanailincaipnt"><img src="https://avatars.githubusercontent.com/u/93596663?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Bogdan Ailincai</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=bogdanailincaipnt" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center"><a href="https://github.com/SimeonGriggs"><img src="https://avatars.githubusercontent.com/u/9684022?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Simeon Griggs</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3ASimeonGriggs" title="Bug reports">🐛</a></td>
      <td align="center"><a href="https://github.com/Kepro"><img src="https://avatars.githubusercontent.com/u/1714370?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Kepro</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3AKepro" title="Bug reports">🐛</a></td>
      <td align="center"><a href="https://github.com/Jake-Lippert"><img src="https://avatars.githubusercontent.com/u/17753127?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Jake Lippert</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3AJake-Lippert" title="Bug reports">🐛</a></td>
      <td align="center"><a href="https://github.com/TunA-Kai"><img src="https://avatars.githubusercontent.com/u/92641762?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Tu Nguyen Anh</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3ATunA-Kai" title="Bug reports">🐛</a> <a href="https://github.com/juliencrn/usehooks-ts/commits?author=TunA-Kai" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/skve"><img src="https://avatars.githubusercontent.com/u/47612057?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Luke Shiels</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Askve" title="Bug reports">🐛</a></td>
      <td align="center"><a href="https://github.com/SleLLl"><img src="https://avatars.githubusercontent.com/u/66108429?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Sergei Kolyago</b></sub></a><br /><a href="#ideas-SleLLl" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center"><a href="https://github.com/adhamaa"><img src="https://avatars.githubusercontent.com/u/50027371?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Adham Akmal Azmi</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Aadhamaa" title="Bug reports">🐛</a></td>
    </tr>
    <tr>
      <td align="center"><a href="https://github.com/alex-kowalczyk"><img src="https://avatars.githubusercontent.com/u/7422175?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Alek Kowalczyk</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Aalex-kowalczyk" title="Bug reports">🐛</a></td>
      <td align="center"><a href="https://github.com/Scalahansolo"><img src="https://avatars.githubusercontent.com/u/4317253?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Sean Callahan</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3AScalahansolo" title="Bug reports">🐛</a></td>
      <td align="center"><a href="https://github.com/jbean96"><img src="https://avatars.githubusercontent.com/u/22803097?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Joshua Bean</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=jbean96" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/ZhaoTim"><img src="https://avatars.githubusercontent.com/u/30540533?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Tim Zhao</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3AZhaoTim" title="Bug reports">🐛</a></td>
      <td align="center"><a href="https://github.com/patryk-smc"><img src="https://avatars.githubusercontent.com/u/37963339?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Patrick</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Apatryk-smc" title="Bug reports">🐛</a></td>
      <td align="center"><a href="https://bryce.io/"><img src="https://avatars.githubusercontent.com/u/3171252?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Bryce Dorn</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=brycedorn" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/angusd3v"><img src="https://avatars.githubusercontent.com/u/52683145?v=4?s=80" width="80px;" alt=""/><br /><sub><b>angusd3v</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=angusd3v" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center"><a href="https://github.com/daiky218"><img src="https://avatars.githubusercontent.com/u/78251524?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Kevin Dai</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=daiky218" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/3GOMESz"><img src="https://avatars.githubusercontent.com/u/28831375?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Gomes</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=3GOMESz" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/ddisimone"><img src="https://avatars.githubusercontent.com/u/78792352?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Davide Di Simone</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Addisimone" title="Bug reports">🐛</a></td>
      <td align="center"><a href="https://github.com/jherr"><img src="https://avatars.githubusercontent.com/u/22392?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Jack Herrington</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=jherr" title="Code">💻</a> <a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Ajherr" title="Bug reports">🐛</a></td>
      <td align="center"><a href="https://sharvit.github.io/"><img src="https://avatars.githubusercontent.com/u/1262502?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Avi Sharvit</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=sharvit" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/nmaties"><img src="https://avatars.githubusercontent.com/u/16613184?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Nicolae Maties</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Anmaties" title="Bug reports">🐛</a></td>
      <td align="center"><a href="https://github.com/secretshardul"><img src="https://avatars.githubusercontent.com/u/49580849?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Shardul Aeer</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Asecretshardul" title="Bug reports">🐛</a></td>
    </tr>
    <tr>
      <td align="center"><a href="https://github.com/herlon214"><img src="https://avatars.githubusercontent.com/u/3419441?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Herlon Aguiar</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Aherlon214" title="Bug reports">🐛</a></td>
      <td align="center"><a href="https://github.com/alexisoney"><img src="https://avatars.githubusercontent.com/u/28802989?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Alexis Oney</b></sub></a><br /><a href="#content-alexisoney" title="Content">🖋</a></td>
      <td align="center"><a href="https://convictional.com/"><img src="https://avatars.githubusercontent.com/u/96080054?v=4?s=80" width="80px;" alt=""/><br /><sub><b>curtvict</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=curtvict" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/JoshuaCS94"><img src="https://avatars.githubusercontent.com/u/23385700?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Josué Cortina</b></sub></a><br /><a href="#content-JoshuaCS94" title="Content">🖋</a></td>
      <td align="center"><a href="https://katt.dev/"><img src="https://avatars.githubusercontent.com/u/459267?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Alex / KATT</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=KATT" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/modex98"><img src="https://avatars.githubusercontent.com/u/72814784?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Mourad EL CADI</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=modex98" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/Guesswhoitis"><img src="https://avatars.githubusercontent.com/u/63756285?v=4?s=80" width="80px;" alt=""/><br /><sub><b>James Hulena</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=Guesswhoitis" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center"><a href="http://hailwood.nz/"><img src="https://avatars.githubusercontent.com/u/709773?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Matthew Hailwood</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=hailwood" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/mike247"><img src="https://avatars.githubusercontent.com/u/676071?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Michael Norrie</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/issues?q=author%3Amike247" title="Bug reports">🐛</a></td>
      <td align="center"><a href="https://github.com/valentinpolitov"><img src="https://avatars.githubusercontent.com/u/39585375?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Valentin Politov</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=valentinpolitov" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/marnusw"><img src="https://avatars.githubusercontent.com/u/971499?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Marnus Weststrate</b></sub></a><br /><a href="https://github.com/juliencrn/usehooks-ts/commits?author=marnusw" title="Code">💻</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification ([emoji key](https://allcontributors.org/docs/en/emoji-key)). Contributions of any kind welcome!

## 🚗 Roadmap

- Unit-test all hooks
- Add more hooks

## 📝 License

This project is [MIT](https://github.com/juliencrn/usehooks-ts/blob/master/LICENSE) licensed.

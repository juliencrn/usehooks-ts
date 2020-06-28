---
templateKey: post
title: MDX Demo
path: '/demo'
date: '2020-04-19'
gistId: '59598636c81071fd8c66af092fb02a09'
gistFilename: useLocalStorage.tsx
---

## This is a sub-heading H2

### This is a sub-heading H3

#### This is a sub-heading H4

##### This is a sub-heading H5

###### This is a sub-heading H6

Heres some code, `<div></div>`, between 2 backticks.

````javascript
// this is multi-line code:
function anotherExample(firstLine, lastLine) {
  if (firstLine == '```' && lastLine == '```') {
    return multiLineCode
  }
}
````

````
// this is multi-line code:
function anotherExample(firstLine, lastLine) {
  if (firstLine == '```' && lastLine == '```') {
    return multiLineCode;
  }
}
````

```shell
yarn clean
```

```css
body {
  display: block;
}
```

You can also make text **bold**... whoa!

Or _italic_.

Or... wait for it... **_both!_**

And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and

> Block Quotes!

And if you want to get really crazy, even tables:

| Wild Header      | Crazy Header    | Another Header?    |
| ---------------- | --------------- | ------------------ |
| Your content can | be here, and it | can be here....    |
| And here.        | Okay.           | I think we get it. |

- And of course there are lists.
  - Some are bulleted.
    - With different indentation levels.
      - That look like this.

1. And there are numbererd lists too.
1. Use just 1s if you want!
1. But the list goes on...

- Even if you use dashes or asterisks.

* And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)

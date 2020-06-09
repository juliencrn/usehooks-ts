---
templateKey: post
title: useSiteMetadata
path: "/use-site-metadata"
date: "2020-06-09"
gistId: "02ce2fb4386d3b0623c274458bab41c3"
gistFilename: useSiteMetadata.tsx
---

> **Note:** This hook is intended for people who work with the [Gatsby.js](https://www.gatsbyjs.org/) framework.


[Gatsby v2 introduces `StaticQuery`](https://www.gatsbyjs.org/docs/static-query/), a new API that allows components to retrieve data via a GraphQL query.

Instead use `StaticQuery` everywhere in yours components, fetch static query in a custom hook to access it using only one-line in yours components.

In the following example, I need for example the sitename (AKA: `title`) in the header as well as in the footer, and surely I would like to display it elsewhere.

Of course you can use this trick with all data type, enjoy!

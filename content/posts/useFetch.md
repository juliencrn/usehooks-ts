---
templateKey: post
title: useFetch
path: '/use-fetch'
date: '2020-07-21'
gistId: '28560727bb94f65e1f5887cea561ab57'
gistFilename: useFetch.tsx
---

Here is a React Hook which aims to retrieve data on a Rest API using the [Axios](https://www.npmjs.com/package/axios) library.

I used a reducer to separate state logic and simplify testing via functional style.

The received data is saved (cached) in the application via useRef, but you can use LocalStorage (see [`useLocalStorage()`](/use-local-storage)) or a caching solution to persist the data.

The fetch is executed when the component is mounted and if the url changes. If ever the url is undefined, or if the component is unmounted before the data is recovered, the fetch will not be called.

#### Sources
You can read [this article](https://www.smashingmagazine.com/2020/07/custom-react-hook-fetch-cache-data/) from "Smashing Magazine" which explains how to build a custom react hook to fetch and cache data

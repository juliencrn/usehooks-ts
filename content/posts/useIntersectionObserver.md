---
templateKey: post
title: useIntersectionObserver
path: '/use-intersection-observer'
date: '2020-07-28'
gistId: 'a3d44c077268b982ae17a077e738fe01'
gistFilename: useIntersectionObserver.tsx
---

This React Hook detects visibility of a component on the viewport using the [`IntersectionObserver` API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) natively present in the browser.

It can be very useful to lazy-loading of images, implementing "infinite scrolling" or starting animations for example.

It takes 2 arguments:
- `ref` (required): A [React ref](https://reactjs.org/docs/refs-and-the-dom.html)
- `options` (optional):  [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)'s options

The returned object contains a boolean `isVisible` shortcut as well as the full IntersectionObserver's `entry` object for more advanced use.

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

It takes `root`, `rootMargin` and `threshold` arguments from the [native `IntersectionObserver` API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) and takes `freezeOnceVisible` to only catch the first appearance too.

The returned object contains the full IntersectionObserver's `entry` object (with `isVisible`property in addition) and a [React ref](https://reactjs.org/docs/refs-and-the-dom.html).

**Source:**

I discovered this way of using `IntersectionObserver` via this [post medium](https://medium.com/the-non-traditional-developer/how-to-use-an-intersectionobserver-in-a-react-hook-9fb061ac6cb5) while trying to lazy-load a collection of images.

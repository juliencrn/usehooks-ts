---
templateKey: post
title: useInterval
path: "/use-interval"
date: "2019-04-27"
gistId: "747e3127cc35600d9dc0270237a457cc"
gistFilename: useInterval.tsx
---

Use [`setInterval`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval) in functional React component with the same API.
Set your callback function as a first parameter and a delay (in milliseconds) for the second argument. You can also stop the timer passing `null` instead the delay.

The main difference between the `setInterval` you know and this `useInterval` hook is that its arguments are "dynamic". You can get more information in the  Dan Abramov's [blog post](https://overreacted.io/making-setinterval-declarative-with-react-hooks/).

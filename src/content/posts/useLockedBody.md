---
templateKey: post
title: useLockedBody
path: '/use-locked-body'
date: '2020-11-01'
gistId: 'c90490e18cf97a4a7c05b276ea629b6f'
gistFilename: useLockedBody.tsx
---

This React hook is used to block the scrolling of the page.

A good example of a use case is when you need to open a modal.

<br />

For flexibility, this hook offers 2 APIs:

- Use it as we would use a useState (example 1)
- Use it with our own logic, coming from a props or redux for example (example 2)

Finally, you can optionally change the reflow padding if you have another sidebar size than the default (15px)

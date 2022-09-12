global.___loader = {
  enqueue: jest.fn(),
}

global.console = {
  warn: jest.fn(),

  // Keep native behaviour for other methods, use those to print out things in your own tests, not `console.log`
  error: console.error,
  info: console.info,
  debug: console.debug,
  log: console.log,
}

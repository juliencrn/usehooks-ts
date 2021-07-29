/* eslint-disable @typescript-eslint/no-var-requires */
const React = require('react')
const gatsby = jest.requireActual('gatsby')

// This mocks the graphql() function, Link component, and StaticQuery component.
module.exports = {
  ...gatsby,
  graphql: jest.fn(),
  Link: jest.fn().mockImplementation(
    // these props are invalid for an `a` tag
    ({
      activeClassName,
      activeStyle,
      getProps,
      innerRef,
      partiallyActive,
      ref,
      replace,
      to,
      ...rest
    }) =>
      React.createElement('a', {
        ...rest,
        href: to,
      }),
  ),
  StaticQuery: jest.fn(),
  useStaticQuery: jest.fn(),
}

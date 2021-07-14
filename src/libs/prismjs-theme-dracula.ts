import { dracula as d } from '~/theme'

const theme = {
  plain: {
    color: d.white,
    backgroundColor: d.background,
  },
  styles: [
    {
      types: ['arrow', 'operator', 'tag'],
      style: {
        color: d.pink,
      },
    },
    {
      types: ['boolean', 'number'],
      style: {
        color: d.purple,
      },
    },
    {
      types: [
        'keyword',
        'constant',
        'builtin',
        'class-name',
        'maybe-class-name',
      ],
      style: {
        color: d.cyan,
      },
    },
    {
      types: ['inserted', 'function', 'attr-name'],
      style: {
        color: d.green,
      },
    },
    {
      types: ['deleted'],
      style: {
        color: d.red,
      },
    },
    {
      types: ['changed', 'parameter'],
      style: {
        color: d.orange,
      },
    },
    {
      types: ['punctuation', 'symbol', 'variable'],
      style: {
        color: d.white,
      },
    },
    {
      types: [
        'string',
        'char',
        'selector',
        'attr-value',
        'attr-value punctuation',
      ],
      style: {
        color: d.yellow,
      },
    },
    {
      types: ['comment', 'prolog', 'doctype', 'cdata'],
      style: {
        color: d.comment,
      },
    },
  ],
}

export default theme

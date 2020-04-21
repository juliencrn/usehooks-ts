const theme = {
  plain: {
    color: '#F8F8F2',
    backgroundColor: '#282A36',
  },
  styles: [
    {
      types: ['arrow', 'operator', 'tag'],
      style: {
        color: 'rgb(255, 121, 198)',
      },
    },
    {
      types: ['boolean'],
      style: {
        color: 'rgb(189, 147, 249)',
      },
    },
    {
      types: ['keyword', 'constant', 'builtin'],
      style: {
        color: 'rgb(139, 233, 253)',
      },
    },
    {
      types: ['inserted', 'function', 'attr-name'],
      style: {
        color: 'rgb(80, 250, 123)',
      },
    },
    {
      types: ['deleted'],
      style: {
        color: 'rgb(255, 85, 85)',
      },
    },
    {
      types: ['changed', 'parameter'],
      style: {
        color: 'rgb(255, 184, 108)',
      },
    },
    {
      types: ['punctuation', 'symbol', 'variable'],
      style: {
        color: 'rgb(248, 248, 242)',
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
        color: 'rgb(241, 250, 140)',
      },
    },
    {
      types: ['comment', 'prolog', 'doctype', 'cdata'],
      style: {
        color: 'rgb(98, 114, 164)',
      },
    },
  ],
}

export default theme

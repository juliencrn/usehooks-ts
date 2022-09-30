import { Children, Fragment, HTMLProps } from 'react'

import { MDXProvider } from '@mdx-js/react'
import MuiDivider from '@mui/material/Divider'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import MuiTableCell from '@mui/material/TableCell'
import MuiTableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import Typography, { TypographyProps } from '@mui/material/Typography'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import Code from './code'

const Divider = styled(MuiDivider)(({ theme }) => ({
  margin: theme.spacing(3, 0),
}))

const Title = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(4),
}))

const TableContainer = styled(MuiTableContainer)(({ theme }) => ({
  margin: theme.spacing(3, 0),
  '& thead td': {
    fontWeight: 700,
  },
}))

const TableCell = styled(MuiTableCell)(({ theme }) => ({
  background: theme.palette.background.default,
}))

const Quote = styled(Typography)(({ theme }) => ({
  borderLeft: `4px solid`,
  borderColor: theme.palette.grey[400],
  padding: theme.spacing(1, 0),
  paddingLeft: theme.spacing(3),
  margin: theme.spacing(3, 0),
  display: 'block',
  backgroundColor: theme.palette.background.paper,
  '& p': {
    margin: 0,
  },
}))

const InlineCode = styled(Typography)(({ theme }) => ({
  fontFamily: 'Fira Code, monospace',
  display: 'inline',
  background:
    theme.palette.mode === 'light'
      ? theme.palette.grey[200]
      : theme.palette.dracula.background,
  padding: theme.spacing(0.2, 0.4),
  borderRadius: 4,
}))

const MdxRenderer = ({ body }: { body: string }) => {
  return (
    <MDXProvider
      components={{
        // Typography
        h1: props => (
          <Title gutterBottom variant="h2" component="h1" {...props} />
        ),
        h2: props => (
          <Title gutterBottom variant="h3" component="h2" {...props} />
        ),
        h3: props => (
          <Title gutterBottom variant="h4" component="h3" {...props} />
        ),
        h4: props => (
          <Title gutterBottom variant="h5" component="h4" {...props} />
        ),
        h5: props => (
          <Title gutterBottom variant="h6" component="h5" {...props} />
        ),
        h6: props => (
          <Title gutterBottom variant="h6" component="h6" {...props} />
        ),
        a: props => <Link {...props} underline="hover" />,
        p: props => <Typography gutterBottom variant="body1" {...props} />,
        blockquote: (props: TypographyProps) => (
          <Quote variant="body1" {...props} />
        ),

        // Code
        pre: props => <Fragment {...props} />,
        code: (props: HTMLProps<HTMLElement>) => {
          // Extract code language
          let lang = undefined
          if (
            props.hasOwnProperty('className') &&
            typeof props.className !== 'undefined'
          ) {
            const classes = props.className.split(' ')
            classes.forEach((element: string) => {
              if (element.includes('language')) {
                lang = element.split('-')[1]
              }
            })
          }
          return (
            <Code code={childrenToString(props.children)} language={lang} />
          )
        },
        inlineCode: props => (
          <InlineCode
            gutterBottom
            variant="body2"
            component="code"
            {...props}
          />
        ),

        // Lists
        li: props => <Typography variant="body1" component="li" {...props} />,

        // Tables
        table: props => (
          <TableContainer as={Paper}>
            <Table {...props} />
          </TableContainer>
        ),
        tr: props => <TableRow {...props} />,
        td: props => <TableCell {...props} align="left" />,
        th: props => <TableCell {...props} align="left" />,

        // Mixins
        hr: () => <Divider />,
        thematicBreak: () => <Divider />,
      }}
    >
      <MDXRenderer>{body}</MDXRenderer>
    </MDXProvider>
  )
}

export default MdxRenderer

const childrenToString = (
  children: HTMLProps<HTMLElement>['children'],
): string => {
  let label = ''

  Children.map(children, child => {
    if (typeof child === 'string') {
      label += child
    }
  })

  return label
}

/* eslint-disable react/display-name */
import React, { Fragment, HTMLProps } from 'react'

import Divider from '@material-ui/core/Divider'
import Link from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Table from '@material-ui/core/Table'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'
import Typography, { TypographyProps } from '@material-ui/core/Typography'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import Code from './code'

const useStyles = makeStyles(theme => ({
  tableContainer: {
    margin: theme.spacing(3, 0),
    '& thead td': {
      fontWeight: 700,
    },
  },
  quote: {
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
  },
  title: {
    marginTop: theme.spacing(4),
  },
  divider: {
    margin: theme.spacing(3, 0),
  },
  inlineCode: {
    fontFamily: 'Fira Code, monospace',
    background:
      theme.palette.type === 'light'
        ? theme.palette.grey[200]
        : theme.palette.dracula.background,
    padding: theme.spacing(0.2, 0.4),
    borderRadius: 4,
  },
}))

const MdxRenderer = ({ body }: { body: string }) => {
  const classes = useStyles()
  return (
    <MDXProvider
      components={{
        // Typography
        h1: props => (
          <Typography
            gutterBottom
            className={classes.title}
            variant="h2"
            component="h1"
            {...props}
          />
        ),
        h2: props => (
          <Typography
            gutterBottom
            className={classes.title}
            variant="h3"
            component="h2"
            {...props}
          />
        ),
        h3: props => (
          <Typography
            gutterBottom
            className={classes.title}
            variant="h4"
            component="h3"
            {...props}
          />
        ),
        h4: props => (
          <Typography
            gutterBottom
            className={classes.title}
            variant="h5"
            component="h4"
            {...props}
          />
        ),
        h5: props => (
          <Typography
            gutterBottom
            className={classes.title}
            variant="h6"
            component="h5"
            {...props}
          />
        ),
        h6: props => (
          <Typography
            gutterBottom
            className={classes.title}
            variant="h6"
            component="h6"
            {...props}
          />
        ),
        a: props => <Link {...props} />,
        p: props => <Typography gutterBottom variant="body1" {...props} />,
        blockquote: (props: TypographyProps) => (
          <Typography
            variant="body1"
            component="span"
            className={classes.quote}
            {...props}
          />
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
          <Typography
            gutterBottom
            variant="body2"
            component="code"
            className={classes.inlineCode}
            {...props}
          />
        ),

        // Lists
        li: props => <Typography variant="body1" component="li" {...props} />,

        // Tables
        table: props => (
          <TableContainer component={Paper} className={classes.tableContainer}>
            <Table {...props} />
          </TableContainer>
        ),
        tr: props => <TableRow {...props} />,
        td: props => <TableCell {...props} />,
        th: props => <TableCell {...props} />,

        // Mixins
        hr: () => <Divider className={classes.divider} />,
        thematicBreak: () => <Divider className={classes.divider} />,
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

  React.Children.map(children, child => {
    if (typeof child === 'string') {
      label += child
    }
  })

  return label
}

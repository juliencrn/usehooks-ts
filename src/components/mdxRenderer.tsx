/* eslint-disable react/display-name */
import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { MDXRenderer, MDXRendererProps } from 'gatsby-plugin-mdx'

import Typography, { TypographyProps } from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import Divider from '@material-ui/core/Divider'
import Paper from '@material-ui/core/Paper'
import TableContainer from '@material-ui/core/TableContainer'
import Table from '@material-ui/core/Table'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

import Code from './code'

const useStyles = makeStyles((theme: Theme) => ({
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
        ? theme.palette.grey[300]
        : theme.palette.background.paper,
    padding: theme.spacing(0.4),
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
        pre: props => props.children,
        code: props => {
          // Extract code language
          let lang = undefined
          if (props.className) {
            const classes = props.className.split(' ')
            classes.forEach((element: string) => {
              if (element.includes('language')) {
                lang = element.split('-')[1]
              }
            })
          }
          return <Code code={props.children.toString()} language={lang} />
        },
        inlineCode: props => (
          <Typography
            gutterBottom
            variant="body1"
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
        td: props => <TableCell>{props.children}</TableCell>,
        th: props => <TableCell>{props.children}</TableCell>,

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

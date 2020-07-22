/* eslint-disable react/display-name */
import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { MDXRenderer, MDXRendererProps } from 'gatsby-plugin-mdx'

import Typography, { TypographyProps } from '@material-ui/core/Typography'
import Link, { LinkProps } from '@material-ui/core/Link'
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
    fontFamily: 'Fira Code, Monaco, monospace',
    background:
      theme.palette.type === 'light'
        ? theme.palette.grey[300]
        : theme.palette.grey[700],
    padding: theme.spacing(0.4),
    borderRadius: 4,
  },
}))

const MdxRenderer = ({ children }: Readonly<MDXRendererProps>) => {
  const classes = useStyles()
  return (
    <MDXProvider
      components={{
        // Typography
        h1: (props: any) => (
          <Typography
            gutterBottom
            className={classes.title}
            variant="h2"
            component="h1"
            {...props}
          />
        ),
        h2: (props: any) => (
          <Typography
            gutterBottom
            className={classes.title}
            variant="h3"
            component="h2"
            {...props}
          />
        ),
        h3: (props: any) => (
          <Typography
            gutterBottom
            className={classes.title}
            variant="h4"
            component="h3"
            {...props}
          />
        ),
        h4: (props: any) => (
          <Typography
            gutterBottom
            className={classes.title}
            variant="h5"
            component="h4"
            {...props}
          />
        ),
        h5: (props: any) => (
          <Typography
            gutterBottom
            className={classes.title}
            variant="h6"
            component="h5"
            {...props}
          />
        ),
        h6: (props: any) => (
          <Typography
            gutterBottom
            className={classes.title}
            variant="h6"
            component="h6"
            {...props}
          />
        ),
        a: (props: LinkProps) => <Link {...props} />,
        p: (props: TypographyProps) => (
          <Typography gutterBottom variant="body1" {...props} />
        ),
        blockquote: (props: TypographyProps) => (
          <Typography
            variant="body1"
            component="span"
            className={classes.quote}
            {...props}
          />
        ),

        // Code
        pre: (props: any) => props.children,
        code: (props: any) => {
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
        inlineCode: (props: TypographyProps) => (
          <Typography
            gutterBottom
            variant="body1"
            component="code"
            className={classes.inlineCode}
            {...props}
          />
        ),

        // Lists
        li: (props: any) => (
          <Typography variant="body1" component="li" {...props} />
        ),

        // Tables
        table: (props: any) => (
          <TableContainer component={Paper} className={classes.tableContainer}>
            <Table {...props} />
          </TableContainer>
        ),
        tr: (props: any) => <TableRow {...props} />,
        td: (props: any) => <TableCell>{props.children}</TableCell>,
        th: (props: any) => <TableCell>{props.children}</TableCell>,

        // Mixins
        hr: () => <Divider className={classes.divider} />,
        thematicBreak: () => <Divider className={classes.divider} />,
      }}
    >
      <MDXRenderer>{children}</MDXRenderer>
    </MDXProvider>
  )
}

export default MdxRenderer

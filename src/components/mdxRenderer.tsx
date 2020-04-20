/* eslint-disable react/display-name */
import React, { Fragment } from 'react'
import { MDXProvider } from '@mdx-js/react'
import {
  Typography,
  TypographyProps,
  LinkProps,
  Link,
  TableContainer,
  Paper,
  Table,
  TableRow,
  TableCell,
  makeStyles,
  Theme,
  Divider,
} from '@material-ui/core'
import { MDXRenderer, MDXRendererProps } from 'gatsby-plugin-mdx'

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
  divider: {
    margin: theme.spacing(3, 0),
  },
  inlineCode: {
    fontFamily: 'Fira Code',
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
        h1: (props: TypographyProps) => (
          <Typography gutterBottom variant="h1" {...props} />
        ),
        h2: (props: TypographyProps) => (
          <Typography gutterBottom variant="h2" {...props} />
        ),
        h3: (props: TypographyProps) => (
          <Typography gutterBottom variant="h3" {...props} />
        ),
        h4: (props: TypographyProps) => (
          <Typography gutterBottom variant="h4" {...props} />
        ),
        h5: (props: TypographyProps) => (
          <Typography gutterBottom variant="h5" {...props} />
        ),
        h6: (props: TypographyProps) => (
          <Typography gutterBottom variant="h6" {...props} />
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
        pre: (props: any) => <Fragment {...props} />,
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

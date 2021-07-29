import React from 'react'

import { makeStyles, Theme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Highlight, { defaultProps, Language } from 'prism-react-renderer'

import CopyButton from './CopyButton'
// TODO: Test that: https://github.com/dracula/highlightjs/tree/b80c704d6b081ec259d8e5b2ddf2925bd06e71bf
// TODO: Test that: https://draculatheme.com/prism/
import theme from '~/libs/prismjs-theme-dracula'
// import theme from 'prism-react-renderer/themes/vsDark'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'relative',
  },
  copyButton: {
    position: 'absolute',
    top: theme.spacing(2),
    right: theme.spacing(2),
    color: theme.palette.common.white,
  },
  pre: {
    textAlign: 'left',
    margin: theme.spacing(2, 0),
    padding: theme.spacing(3, 2),
    borderRadius: 4,
    fontFamily: 'Fira Code, monospace',
    overflowX: 'auto',
    boxShadow: theme.shadows[6],
  },
  line: {
    display: 'inline-block',
    width: theme.spacing(4),
    userSelect: 'none',
    color: theme.palette.dracula.comment,
  },
}))

export interface CodeProps {
  code: string
  language?: Language
}

const Code = ({ code, language = 'tsx' }: CodeProps) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <CopyButton classNames={classes.copyButton} value={code} />
      <Highlight
        {...defaultProps}
        code={code.trim()}
        theme={theme}
        language={language}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <Typography
            variant="body2"
            component="pre"
            className={className + ' ' + classes.pre}
            style={style}
          >
            {tokens.map((line, i) => {
              // Remove the last empty line:
              let LineNumberElem
              if (
                line.length === 1 &&
                line[0].empty === true &&
                i === tokens.length - 1
              ) {
                LineNumberElem = null
              } else {
                LineNumberElem = <span className={classes.line}>{i + 1}</span>
              }

              return (
                <div key={i} {...getLineProps({ line, key: i })}>
                  {LineNumberElem}
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </div>
              )
            })}
          </Typography>
        )}
      </Highlight>
    </div>
  )
}

export default Code

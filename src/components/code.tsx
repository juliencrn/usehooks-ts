import React from 'react'
import Highlight, { defaultProps, Language } from 'prism-react-renderer'
import { Theme, makeStyles } from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'

// TODO: Test that: https://github.com/dracula/highlightjs/tree/b80c704d6b081ec259d8e5b2ddf2925bd06e71bf
// TODO: Test that: https://draculatheme.com/prism/
import theme from '../libs/prismjs-theme-dracula'
// import theme from 'prism-react-renderer/themes/vsDark'

const useStyles = makeStyles((theme: Theme) => ({
  pre: {
    textAlign: 'left',
    margin: theme.spacing(3, 0),
    padding: theme.spacing(2, 1),
    borderRadius: 4,
    fontFamily: 'Fira Code, monospace',
    overflowX: 'auto',
    boxShadow: theme.shadows[6],
  },
  line: {
    display: 'inline-block',
    width: theme.spacing(4),
    userSelect: 'none',
    opacity: '0.3',
  },
}))

export interface CodeProps {
  code: string
  language?: Language
}

const Code = ({ code, language = 'tsx' }: CodeProps) => {
  const classes = useStyles()
  return (
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
  )
}

export default Code

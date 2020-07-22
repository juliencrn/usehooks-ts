import deepMerge from 'deepmerge'
import { red, blue } from '@material-ui/core/colors'
import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeOptions,
  Theme,
} from '@material-ui/core/styles'

import FiraRegular from './assets/fonts/FiraSans-Regular.ttf'
import FiraCode from './assets/fonts/FiraMono-Regular.otf'
import Monaco from './assets/fonts/Monaco.ttf'

const firaRegular = {
  fontFamily: 'Fira Sans Regular',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `url(${FiraRegular}) format('truetype')`,
}

const monaco = {
  fontFamily: 'Monaco',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `url(${Monaco}) format('truetype')`,
}

const firaCode = {
  fontFamily: 'Fira Code',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
    local('Open Sans Regular'),
    local('OpenSans-Regular'),
    url(${FiraCode}) format('woOpenTypeff2')
  `,
}

const makeTheme = (variant: ThemeOptions): Theme => {
  const common = {
    palette: {
      error: {
        main: red.A400,
      },
    },
    gradient: {
      primary:
        'linear-gradient(140deg, rgb(57, 45, 209) 0%, rgb(142, 41, 149) 100%);',
    },
    typography: {
      fontFamily: [
        'Fira Sans Regular',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ],
    },
    overrides: {
      MuiCssBaseline: {
        '@global': {
          '@font-face': [firaRegular, firaCode, monaco],
        },
      },
    },
  }

  const theme = createMuiTheme(deepMerge(common, variant))
  return responsiveFontSizes(theme)
}

const light: ThemeOptions = {
  palette: {
    type: 'light',
    primary: {
      main: blue[700],
    },
  },
}

const dark: ThemeOptions = {
  palette: {
    type: 'dark',
    primary: {
      main: blue[300],
    },
  },
}

const themes = {
  light: makeTheme(light),
  dark: makeTheme(dark),
}

export default themes

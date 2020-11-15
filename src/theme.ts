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

const firaRegular = {
  fontFamily: 'Fira Sans Regular',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `url(${FiraRegular}) format('truetype')`,
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
          '@font-face': [firaRegular, firaCode],
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

// See: https://github.com/dracula/dracula-theme#color-palette
const dark: ThemeOptions = {
  palette: {
    type: 'dark',
    primary: {
      main: '#ff79c6',
    },
    common: {
      white: '#f8f8f2',
      black: '#282a36',
    },
    background: {
      default: '#44475a',
      paper: '#282a36',
    },
  },
}

const themes = {
  light: makeTheme(light),
  dark: makeTheme(dark),
}

export default themes

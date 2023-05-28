import { responsiveFontSizes, Theme, ThemeOptions } from '@mui/material'
import { blue, red } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'
import deepMerge from 'deepmerge'

export const dracula = {
  background: '#282a36',
  currentLine: '#44475a',
  selection: '#44475a',
  white: '#f8f8f2',
  comment: '#6272a4',
  cyan: '#8be9fd',
  green: '#50fa7b',
  orange: '#ffb86c',
  pink: '#ff79c6',
  purple: '#bd93f9',
  red: '#ff5555',
  yellow: '#f1fa8c',
}

export type Dracula = typeof dracula

export const drawerWidth = 280

const makeTheme = (variant: ThemeOptions): Theme => {
  const common: ThemeOptions = {
    palette: {
      error: {
        main: red.A400,
      },
      dracula,
      gradient: {
        primary:
          'linear-gradient(140deg, rgb(57, 45, 209) 0%, rgb(142, 41, 149) 100%);',
      },
    },
    shape: {
      borderRadius: 8,
    },
    typography: {
      fontFamily: [
        'Fira Sans',
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
      ].join(','),
    },

    components: {
      MuiLink: {
        defaultProps: {
          underline: 'hover',
        },
      },
    },
  }

  const theme = createTheme(deepMerge(common, variant))
  return responsiveFontSizes(theme)
}

const light: Partial<ThemeOptions> = {
  palette: {
    mode: 'light',
    primary: {
      main: blue[700],
    },
  },
}

// See: https://github.com/dracula/dracula-theme#color-palette
const dark: Partial<ThemeOptions> = {
  palette: {
    mode: 'dark',
    primary: {
      main: dracula.pink,
    },
    common: {
      white: dracula.white,
      black: dracula.background,
    },
    background: {
      default: '#1d1e26',
      paper: '#1d1e26',
    },
  },
}

export interface Themes {
  dark: Theme
  light: Theme
}

const themes: Themes = {
  light: makeTheme(light),
  dark: makeTheme(dark),
}

export default themes

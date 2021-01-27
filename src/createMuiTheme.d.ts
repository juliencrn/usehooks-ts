// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme'

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    gradient: {
      primary: PaletteColorOptions
    }
  }

  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    gradient?: {
      primary?: PaletteColorOptions
    }
  }
}

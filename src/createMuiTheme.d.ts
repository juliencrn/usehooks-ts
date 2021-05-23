// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme'

import { Dracula } from './theme'

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    dracula: Dracula
    gradient: {
      primary: PaletteColorOptions
    }
  }

  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    dracula?: Dracula
    gradient?: {
      primary?: PaletteColorOptions
    }
  }
}

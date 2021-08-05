import { Dracula } from './theme'

declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    dracula: Dracula
    gradient: {
      primary: string
    }
  }

  interface PaletteOptions {
    dracula?: Dracula
    gradient?: {
      primary?: string
    }
  }
}

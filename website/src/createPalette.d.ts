import { Dracula } from './theme'

declare module '@mui/material/styles' {
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

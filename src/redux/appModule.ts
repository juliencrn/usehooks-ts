import { createSlice } from '@reduxjs/toolkit'

export interface AppState {
  theme: 'light' | 'dark'
  drawerOpen: boolean
}

const initialState: AppState = {
  theme: 'light',
  drawerOpen: false,
}

const app = createSlice({
  name: 'app',
  initialState,
  reducers: {
    openDrawer(state) {
      state.drawerOpen = true
    },
    closeDrawer(state) {
      state.drawerOpen = false
    },
    toggleTheme(state) {
      const newTheme = state.theme === 'light' ? 'dark' : 'light'
      state.theme = newTheme
    },
  },
})

export const { openDrawer, closeDrawer, toggleTheme } = app.actions

export default app.reducer

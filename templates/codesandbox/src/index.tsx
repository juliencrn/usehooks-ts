import React from 'react'

import { createRoot } from 'react-dom/client'

import './styles.css'
import App from './App'

const container = document.getElementById('root')
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!)
root.render(<App />)

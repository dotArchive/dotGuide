import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme'

ReactDOM.render(
  <React.StrictMode>
    {/* <ThemeProvider> */}
    {/* <CssBaseline /> */}
    <App />
    {/* </ThemeProvider> */}
  </React.StrictMode>,
  document.getElementById('root')
)

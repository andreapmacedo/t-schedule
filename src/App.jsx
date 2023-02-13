// import './App.css'
// import MainPage from './pages/MainPage'
import React from 'react'
import { ThemeProvider } from 'styled-components'
import GlobalStyles from './styles/GlobalStyles'
import Layout from './components/Layout'

import dark from './styles/themes/dark'
import light from './styles/themes/light'

function App() {
  return (
    <ThemeProvider theme={dark}>
      <GlobalStyles />
      {/* <MainPage /> */}
      <Layout />
    </ThemeProvider>
  )
}

export default App

// import './App.css'
// import MainPage from './pages/MainPage'
import React from 'react'
import { ThemeProvider } from 'styled-components'
import GlobalStyles from './styles/GlobalStyles'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'

import dark from './styles/themes/dark'
import light from './styles/themes/light'

function App() {
  return (
    <ThemeProvider theme={dark}>
      <GlobalStyles />
      {/* <MainPage /> */}
      <Layout>
        <Dashboard />
      </Layout>
    </ThemeProvider>
  )
}

export default App

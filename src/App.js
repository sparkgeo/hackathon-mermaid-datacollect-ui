/*

  App.js is used to control all React Context Providers

*/

import React from 'react'
import { ThemeProvider } from 'styled-components'
import { Grommet } from 'grommet'

import 'leaflet/dist/leaflet.css'

import LayoutSignedIn from './layouts/LayoutSignedIn'
import theme from './theme'
import './App.css'
import Router from './pages/___Routes'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Grommet theme={theme} full>
        <LayoutSignedIn>
          <Router />
        </LayoutSignedIn>
      </Grommet>
    </ThemeProvider>
  )
}

export default App

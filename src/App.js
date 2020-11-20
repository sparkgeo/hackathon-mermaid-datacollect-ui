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
import { UserContextProvider } from './context/UserContext'

import { startServer } from './lib/api'

function App() {
  startServer()

  return (
    <>
      <ThemeProvider theme={theme}>
        <Grommet theme={theme} full>
          <UserContextProvider>
            <LayoutSignedIn>
              <Router />
            </LayoutSignedIn>
          </UserContextProvider>
        </Grommet>
      </ThemeProvider>
    </>
  )
}

export default App

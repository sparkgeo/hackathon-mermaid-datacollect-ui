/*

  App.js is used to control all React Context Providers

*/

import React from 'react'
import { ThemeProvider } from 'styled-components'
import { Grommet } from 'grommet'

import { Layout } from './components'
import LayoutSignedIn from './layouts/LayoutSignedIn'
import theme from './theme'
import './App.css'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Grommet theme={theme} full>
        <LayoutSignedIn>
          <h1>hello world</h1>
        </LayoutSignedIn>
      </Grommet>
    </ThemeProvider>
  )
}

export default App

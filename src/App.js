/*

  App.js is used to control all React Context Providers

*/

import React from 'react'
import { ThemeProvider } from 'styled-components'
import { Grommet } from 'grommet'

import LayoutSignedIn from './layouts/LayoutSignedIn'
import theme from './theme'
import './App.css'
import SiteForm from './components/SiteForm'
import Breadcrumbs from './components/Breadcrumbs'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Grommet theme={theme} full>
        <LayoutSignedIn>
          <SiteForm />
        </LayoutSignedIn>
      </Grommet>
    </ThemeProvider>
  )
}

export default App

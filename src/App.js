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
import SiteForm from './components/SiteForm'
import SiteService from './services/siteService'
import SiteList from './components/SiteList'

function App() {
  const siteService = new SiteService()

  return (
    <ThemeProvider theme={theme}>
      <Grommet theme={theme} full>
        <LayoutSignedIn>
          <SiteForm siteService={siteService} />
          <SiteList siteService={siteService} />
        </LayoutSignedIn>
      </Grommet>
    </ThemeProvider>
  )
}

export default App

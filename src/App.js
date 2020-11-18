/*

  App.js is used to control all React Context Providers

*/

import React, { useEffect, useRef, useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { Grommet } from 'grommet'

import 'leaflet/dist/leaflet.css'

import LayoutSignedIn from './layouts/LayoutSignedIn'
import theme from './theme'
import './App.css'
import SiteForm from './components/SiteForm'
import SiteService from './services/siteService'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import EditSite from './components/EditSite'
import AllSites from './components/AllSites'
function App() {
  const siteService = useRef()
  const [sites, setSites] = useState([])
  const isAppInitialized = !!siteService.current

  useEffect(() => {
    siteService.current = new SiteService()
    const getAllSites = () => {
      siteService.current.getSites().then((response) => {
        setSites(response.rows.map((row) => row.doc))
      })
    }
    getAllSites()
    siteService.current.clientDb
      .changes({ since: 'now', live: true })
      .on('change', getAllSites)
  }, [])
  return (
    <ThemeProvider theme={theme}>
      <Grommet theme={theme} full>
        {isAppInitialized && (
          <Router>
            <LayoutSignedIn>
              <Switch>
                <Route exact path="/">
                  <SiteForm siteService={siteService.current} sites={sites} />
                </Route>
              </Switch>
              <Switch>
                <Route path="/sites">
                  <AllSites sites={sites} />
                </Route>
              </Switch>
              <Switch>
                <Route path="/editsite">
                  <EditSite />
                </Route>
              </Switch>
            </LayoutSignedIn>
          </Router>
        )}
      </Grommet>
    </ThemeProvider>
  )
}

export default App

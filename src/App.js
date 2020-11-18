/*

  App.js is used to control all React Context Providers

*/

import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { Grommet } from 'grommet'

import 'leaflet/dist/leaflet.css'

import LayoutSignedIn from './layouts/LayoutSignedIn'
import theme from './theme'
import './App.css'
import SiteForm from './components/SiteForm'
import SiteList from './components/SiteList'
import PDB from './pdb'

function App() {
  const pdb = new PDB()
  const [sites, setSites] = useState({})
  const [status, setStatus] = useState('')

  useEffect(() => {
    async function fetchSites() {
      const sites = await pdb.getAllSites()
      console.log('Sites fetched: ', sites)
      setSites(sites)
      setStatus('')
    }

    setStatus('loading')
    pdb.syncPDB()
    fetchSites()
  }, [])

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Grommet theme={theme} full>
          <LayoutSignedIn>
            <Route
              exact
              path="/"
              component={() => <SiteList sites={sites} />}
            />
            <Route
              exact
              path="/sites/:id"
              component={(props) => (
                <SiteForm
                  {...props}
                  site={sites[props.match.params.id]}
                  status={status}
                />
              )}
            />
            <Route
              exact
              path="/new"
              component={(props) => (
                <SiteForm {...props} addNew status={status} />
              )}
            />
          </LayoutSignedIn>
        </Grommet>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App

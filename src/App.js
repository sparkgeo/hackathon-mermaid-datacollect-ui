/*

  App.js is used to control all React Context Providers

*/

import React from 'react'
import { ThemeProvider } from 'styled-components'
import { Grommet } from 'grommet'
import { Helmet } from 'react-helmet'
import 'leaflet/dist/leaflet.css'

import LayoutSignedIn from './layouts/LayoutSignedIn'
import theme from './theme'
import './App.css'
import Router from './pages/___Routes'

const isAmplify = process.env.REACT_APP_API_MODE === 'amplify'

function App() {
  return (
    <>
      {isAmplify ? (
        <Helmet>
          <meta
            name="description"
            content="A proof-of-concept for Mermaid Dashboard sites using AWS Appsync"
          />
          <meta property="og:title" content="Mermaid Remixed Appsync" />
          <meta
            property="og:url"
            content="https://collect-mermaid-replugged-amplified.netlify.app/"
          />
          <meta
            property="og:image"
            content="%PUBLIC_URL%/mermaid-remixed-asset.png"
          />
          <meta
            property="og:description"
            content="A proof-of-concept for Mermaid Dashboard sites using AWS Appsync"
          />
          <title>Mermaid Replugged Appsync</title>
        </Helmet>
      ) : (
        <Helmet>
          <meta
            name="description"
            content="A proof-of-concept for Mermaid Dashboard sites not made by parm"
          />
          <meta property="og:title" content="Alain wuz here" />

          <meta
            property="og:image"
            content="%PUBLIC_URL%/mermaid-remixed-asset.png"
          />
          <meta
            property="og:description"
            content="A proof-of-concept for Mermaid Dashboard sites using AWS Appsync"
          />
          <title>Hello World</title>
        </Helmet>
      )}
      <ThemeProvider theme={theme}>
        <Grommet theme={theme} full>
          <LayoutSignedIn>
            <Router />
          </LayoutSignedIn>
        </Grommet>
      </ThemeProvider>
    </>
  )
}

export default App

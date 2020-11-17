import React from 'react'
import { Footer, Heading, Header, Layer, Main, Box, Text } from 'grommet'
import { Menu } from 'grommet-icons'
import Breadcrumbs from '../components/Breadcrumbs'

function LayoutSignedIn({ children }) {
  return (
    <>
      <Header
        height="xxsmall"
        background="dark-2"
        pad={{ horizontal: 'medium' }}
      >
        <Box>
          <Heading level="4">mermaid</Heading>
        </Box>
        <Box direction="row">
          <Box margin={{ right: 'small' }}>Projects</Box>
          <Box margin={{ right: 'small' }}>Reference</Box>
          <Box margin={{ right: 'small' }}>DS</Box>
          <Box>
            <Menu />
          </Box>
        </Box>
      </Header>
      <Main>
        <Box
          direction="row"
          pad={{ horizontal: 'small' }}
          justify="between"
          height="xsmall"
          border={{ bottom: 'xsmall' }}
        >
          <Breadcrumbs />
        </Box>
        <>{children}</>
      </Main>
      <Footer background="dark-1">(footer)</Footer>
    </>
  )
}

export default LayoutSignedIn

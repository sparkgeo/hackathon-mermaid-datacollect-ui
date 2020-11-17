import React from 'react'
import { Footer, Heading, Header, Main, Box } from 'grommet'
import { Menu } from 'grommet-icons'

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
      <Main fill>{children}</Main>
      <Footer background="dark-1">(footer)</Footer>
    </>
  )
}

export default LayoutSignedIn

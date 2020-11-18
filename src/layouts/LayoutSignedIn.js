import React from 'react'
import { Footer, Heading, Header, Main, Box } from 'grommet'
import { Menu } from 'grommet-icons'
import { Row } from '../components/commonUI'
import { Link } from 'react-router-dom'

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
      <nav>
        <ul>
          <li>
            <Link to="/">New Site</Link>
          </li>
          <li>
            <Link to="/sites">All Sites</Link>
          </li>
        </ul>
      </nav>
      <Main fill>
        <Row>{children}</Row>
      </Main>
      <Footer background="dark-1">(footer)</Footer>
    </>
  )
}

export default LayoutSignedIn

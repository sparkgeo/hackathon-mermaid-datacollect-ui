import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Heading, Header, Layer, Main, Box, Text } from 'grommet'
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
        <Box>Projects</Box>
        <Box>Reference</Box>
        <Box>DS</Box>
        <Box>
          <Menu />
        </Box>
      </Header>
      <Main>{children}</Main>
    </>
  )
}

export default LayoutSignedIn

import React from 'react'
import { Box, Anchor, Text } from 'grommet'
import { FormNext } from 'grommet-icons'

const Breadcrumbs = ({ siteName }) => {
  return (
    <Box pad={{ top: 'medium' }}>
      <Box height="xxsmall" direction="row" align="center">
        <Anchor href="#">Projects</Anchor>
        <FormNext />
        <Anchor href="#">Dustin's Project</Anchor>
        <FormNext />
        <Anchor href="/">Sites</Anchor>
        {siteName !== '' && (
          <>
            <FormNext />
            <Text>{siteName}</Text>
          </>
        )}
      </Box>{' '}
    </Box>
  )
}

export default Breadcrumbs

import React from 'react'
import { Box, Anchor, Text } from 'grommet'
import { FormNext } from 'grommet-icons'
import { useLocation } from 'react-router-dom'

const Breadcrumbs = () => {
  const { pathname } = window.location

  const newRecord = /new/.test(pathname)
  const viewRecord = /record\.*/.test(pathname)
  const editRecord = /edit/.test(pathname)

  return (
    <Box pad={{ top: 'medium' }}>
      <Box height="xxsmall" direction="row" align="center">
        <Anchor href="/">Projects</Anchor>
        <FormNext />
        <Anchor href="/">Dustin's Project</Anchor>
        <FormNext />
        <Anchor href="/">Site List</Anchor>

        {newRecord && (
          <>
            <FormNext />
            <Text href="#">New</Text>
          </>
        )}
        {viewRecord && (
          <>
            <FormNext />
            <Text href="#">Site</Text>
          </>
        )}
        {editRecord && (
          <>
            <FormNext />
            <Text href="#">edit</Text>
          </>
        )}
      </Box>{' '}
    </Box>
  )
}

export default Breadcrumbs

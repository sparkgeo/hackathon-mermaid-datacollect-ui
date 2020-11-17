import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Box, Button, Heading, List } from 'grommet'

import Breadcrumbs from './Breadcrumbs'

function SiteList({ sites }) {
  const NoteList = () => {
    const siteList = sites !== undefined ? Object.values(sites) : []

    return siteList.map((s) => (
      <div key={s._id}>
        <h3>
          <Link to={`/sites/${s._id}`}>{s.name}</Link>{' '}
        </h3>
      </div>
    ))
  }

  return (
    <>
      <Box
        direction="row"
        pad={{ horizontal: 'small' }}
        justify="between"
        height="xsmall"
        border={{ bottom: 'xsmall' }}
      >
        <Breadcrumbs />
      </Box>
      <NoteList />
    </>
  )
}

export default SiteList

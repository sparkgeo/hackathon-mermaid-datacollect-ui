import React, { useState } from 'react'
import { useHistory , Link} from 'react-router-dom'
import {
  Box,
  Button,
  Heading,
  List,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
} from 'grommet'

import Breadcrumbs from './Breadcrumbs'
import convertToName from '../helpers/convertToName'
import reef_types from '../lib/reef_types'
import reef_zones from '../lib/reef_zones'
import reef_exposures from '../lib/reef_exposures'

function SiteList({ sites }) {
  const history = useHistory()

  const addNewSite = () => {
    history.push('/new')
  }

  const NoteTable = () => {
    const siteList = sites !== undefined ? Object.values(sites) : []

    const ItemRow = () =>
      siteList.map((s) => (
        <TableRow key={s._id}>
          <TableCell scope="row">
            <Link to={`/sites/${s._id}`}>{s.name}</Link>{' '}
          </TableCell>
          <TableCell>
            {convertToName(s.reef_exposure, reef_exposures)}
          </TableCell>
          <TableCell>{convertToName(s.reef_type, reef_types)}</TableCell>
          <TableCell>{convertToName(s.reef_zone, reef_zones)}</TableCell>
          <TableCell>{s._conflicts ? 'Conflict' : 'Updated'}</TableCell>
        </TableRow>
      ))
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell scope="col" border="bottom">
              Name
            </TableCell>
            <TableCell scope="col" border="bottom">
              Reef Exposure
            </TableCell>
            <TableCell scope="col" border="bottom">
              Reef Type
            </TableCell>
            <TableCell scope="col" border="bottom">
              Reef Zone
            </TableCell>
            <TableCell scope="col" border="bottom">
              Status
            </TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          <ItemRow />
        </TableBody>
      </Table>
    )
  }

  return (
    <>
      <Box
        direction="row"
        pad={{ horizontal: 'small' }}
        justify="between"
        height="xsmall"
        border={{ bottom: 'xsmall' }}
        align="center"
      >
        <Breadcrumbs />
        <Button primary label="new site" onClick={addNewSite} />
      </Box>
      <NoteTable />
    </>
  )
}

export default SiteList

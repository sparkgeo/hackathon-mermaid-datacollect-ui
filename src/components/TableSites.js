import React from 'react'
import PropTypes from 'prop-types'
import {
  Anchor,
  Box,
  Text,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  Heading,
} from 'grommet'
import { Edit, DocumentText as View } from 'grommet-icons'

/**
 * Table that loads on the homepage
 *
 */
function TableSites(props) {
  const { sites } = props

  console.log('Sites ', sites)

  return (
    <Box direction="column">
      <Box>
        <Heading>Records</Heading>
      </Box>
      <Box pad={{ horizontal: 'medium' }}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell scope="col" border="bottom">
                Name
              </TableCell>
              <TableCell scope="col" border="bottom">
                Country
              </TableCell>
              <TableCell scope="col" border="bottom">
                Synced
              </TableCell>
              <TableCell scope="col" border="bottom">
                Validated
              </TableCell>
              <TableCell scope="col" border="bottom">
                View
              </TableCell>
              <TableCell scope="col" border="bottom">
                Edit
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sites.map((i, index) => (
              <TableRow
                key={`table-row-${i.name.split(' ').join('-')}-${index}`}
              >
                <TableCell scope="row">
                  <strong>{i.name}</strong>
                </TableCell>
                <TableCell>{i.country}</TableCell>
                <TableCell>Coconut</TableCell>
                <TableCell>Coconut</TableCell>
                <TableCell>Coconut</TableCell>
                <TableCell>Coconut</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  )
}

TableSites.propTypes = {
  sites: PropTypes.arrayOf(PropTypes.shape()),
}

TableSites.defaultProps = {
  sites: [],
}

export default TableSites

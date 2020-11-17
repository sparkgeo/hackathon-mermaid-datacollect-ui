import React, { useState } from 'react'
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
  Layer,
  Button,
} from 'grommet'
import { Edit, DocumentText as View, Trash as Delete } from 'grommet-icons'

import { deleteRecord, clearLocalData } from '../lib/api'

/**
 * Table that loads on the homepage
 *
 */
function TableSites(props) {
  const { sites } = props
  const [deleteConfirmModal, setDeleteConfirmModal] = useState(null)
  const [clearConfirmModal, setClearConfirmModal] = useState(false)

  return (
    <>
      {deleteConfirmModal && (
        <Layer
          onClickOutside={() => setDeleteConfirmModal(null)}
          onEsc={() => setDeleteConfirmModal(null)}
        >
          <Box width="medium">
            <Box pad="medium">Do you want to delete</Box>
            <Box direction="row" width="fill" justify="around" pad="medium">
              <Button
                label="yes"
                onClick={() => {
                  deleteRecord(deleteConfirmModal)
                  setDeleteConfirmModal(null)
                }}
                primary
              />
              <Button label="no" onClick={() => setDeleteConfirmModal(null)} />
            </Box>
          </Box>
        </Layer>
      )}
      {clearConfirmModal && (
        <Layer
          onClickOutside={() => setClearConfirmModal(null)}
          onEsc={() => setClearConfirmModal(null)}
        >
          <Box width="medium">
            <Box pad="medium">Do you want to clear local storage</Box>
            <Box direction="row" width="fill" justify="around" pad="medium">
              <Button
                label="yes"
                onClick={() => {
                  clearLocalData()
                  setClearConfirmModal(false)
                }}
                primary
              />
              <Button label="no" onClick={() => setClearConfirmModal(false)} />
            </Box>
          </Box>
        </Layer>
      )}
      <Box direction="column">
        <Box
          width="fill"
          direction="row"
          justify="between"
          align="center"
          pad={{ horizontal: 'medium' }}
        >
          <Heading>Records</Heading>
          <Box direction="row" width="medium">
            <Anchor href="/new" margin={{ right: 'small' }}>
              <Button label="Create new" primary />
            </Anchor>
            <Button
              label="Clear Loacal Data"
              onClick={() => setClearConfirmModal(true)}
              primary
            />
          </Box>
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
                  Edit
                </TableCell>
                <TableCell scope="col" border="bottom">
                  View
                </TableCell>
                <TableCell scope="col" border="bottom">
                  Delete
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
                  <TableCell>
                    <Anchor href={`/record/${i.id}/edit`}>
                      <Edit />
                    </Anchor>
                  </TableCell>
                  <TableCell>
                    <Anchor href={`/record/${i.id}`}>
                      <View />
                    </Anchor>
                  </TableCell>
                  <TableCell>
                    <Button
                      icon={<Delete />}
                      onClick={() => setDeleteConfirmModal(i.id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Box>
    </>
  )
}

TableSites.propTypes = {
  sites: PropTypes.arrayOf(PropTypes.shape()),
}

TableSites.defaultProps = {
  sites: [],
}

export default TableSites

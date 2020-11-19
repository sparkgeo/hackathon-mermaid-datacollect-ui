import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import {
  Anchor,
  Box,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  Heading,
  Button,
  ResponsiveContext,
} from 'grommet'
import { Edit, DocumentText as View, Trash as Delete } from 'grommet-icons'

import ModalConfirmation from './ModalConfirmation'

import { deleteRecord, clearLocalData } from '../lib/api'
import { reverseCountries } from '../lib/countries'

/**
 * Table that loads on the homepage
 *
 */
function TableSites(props) {
  const size = useContext(ResponsiveContext)
  const { sites } = props
  const [deleteConfirmModal, setDeleteConfirmModal] = useState(null)
  const [clearConfirmModal, setClearConfirmModal] = useState(false)

  return (
    <>
      {deleteConfirmModal && (
        <ModalConfirmation
          question="Do you want to delete"
          closeModal={() => setDeleteConfirmModal(null)}
          executeAction={() => deleteRecord(deleteConfirmModal)}
        />
      )}
      {clearConfirmModal && (
        <ModalConfirmation
          question="Do you want to clear local storage"
          closeModal={() => setClearConfirmModal(false)}
          executeAction={() => clearLocalData()}
        />
      )}
      <Box
        direction="column"
        margin={{
          horizontal:
            size === 'large' ? 'xlarge' : size === 'medium' ? 'small' : 0,
        }}
      >
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
              label="Clear Local Data"
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
                {/* <TableCell scope="col" border="bottom">
                  Synced
                </TableCell>
                <TableCell scope="col" border="bottom">
                  Validated
                </TableCell> */}
                <TableCell scope="col" border="bottom">
                  Edit
                </TableCell>
                {/* <TableCell scope="col" border="bottom">
                  View
                </TableCell> */}
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
                  <TableCell>
                    {reverseCountries[i.country] ?? 'unknown'}
                  </TableCell>
                  {/* <TableCell>Coconut</TableCell>
                  <TableCell>Coconut</TableCell> */}
                  <TableCell>
                    <Anchor href={`/record/${i.id}/edit`}>
                      <Edit />
                    </Anchor>
                  </TableCell>
                  {/* <TableCell>
                    <Anchor href={`/record/${i.id}`}>
                      <View />
                    </Anchor>
                  </TableCell> */}
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

import { Button } from 'grommet'
import React, { useEffect, useState } from 'react'
import { Table, Td, Th, Tr, Column } from './commonUI'
import { Link } from 'react-router-dom'

const SiteList = ({ sites, editable }) => {
  return (
    <Column>
      <Table>
        <thead>
          <Tr>
            <Th>Site Name</Th>
            <Th>Latitude</Th>
            <Th>Longitude</Th>
            {editable && <Th></Th>}
          </Tr>
        </thead>
        <tbody>
          {sites.map((site) => {
            return (
              <Tr key={site._id}>
                <Td>{site.name}</Td>
                <Td>{site.lat}</Td>
                <Td>{site.lng}</Td>
                {editable && (
                  <Td>
                    <Link to="/editsite">Edit this site instead</Link>
                  </Td>
                )}
              </Tr>
            )
          })}
        </tbody>
      </Table>
    </Column>
  )
}

export default SiteList

import { Button } from 'grommet'
import React, { useEffect, useState } from 'react'
import { Table, Td, Th, Tr, Column } from './commonUI'
import { Link } from 'react-router-dom'
import { countries, reefExposures, reefTypes, reefZones } from '../helpers'

const SiteList = ({ sites, editable }) => {
  return (
    <Column>
      <Table>
        <thead>
          <Tr>
            <Th>Site Name</Th>
            <Th>Exposure</Th>
            <Th>Reef Type</Th>
            <Th>Reef Zone</Th>
            <Th>Country</Th>
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
                <Td>{reefExposures[site.exposure]}</Td>
                <Td>{reefTypes[site.reefType]}</Td>
                <Td>{reefZones[site.reefZone]}</Td>
                <Td>{countries[site.country]}</Td>
                <Td>{site.lat}</Td>
                <Td>{site.lng}</Td>
                {editable && (
                  <Td>
                    <Link to="/editsite">Edit</Link>
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

import React, { useEffect, useState } from 'react'
import { Table, Td, Th, Tr, Column } from './commonUI'

const SiteList = ({ siteService }) => {
  const [sites, setSites] = useState([])

  useEffect(() => {
    const getAllSites = () => {
      console.log('get all sites')
      siteService.clientDb.allDocs(
        { include_docs: true, descending: true },
        (err, doc) => {
          console.log(err, doc)
          setSites(doc.rows)
        },
      )
    }

    getAllSites()
    siteService.clientDb
      .changes({ since: 'now', live: true })
      .on('change', getAllSites)
  }, [siteService.clientDb])

  return (
    <Column>
      <h2>Sites</h2>
      <Table>
        <thead>
          <Tr>
            <Th>Site Name</Th>
          </Tr>
        </thead>
        <tbody>
          {sites.map((site) => {
            const x = site.doc

            return (
              <Tr key={x._id}>
                <Td>{x.name}</Td>
              </Tr>
            )
          })}
        </tbody>
      </Table>
    </Column>
  )
}

export default SiteList

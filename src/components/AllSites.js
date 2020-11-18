import React from 'react'
import { Column } from './commonUI'
import SiteList from './SiteList'

const AllSites = ({ sites }) => {
  return (
    <Column>
      <h2>All Sites</h2>
      <SiteList sites={sites} />
    </Column>
  )
}

export default AllSites

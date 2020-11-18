import React from 'react'
import { useParams } from 'react-router-dom'
import EditSiteForm from '../components/EditSiteForm'

const EditRecordPage = () => {
  const { record } = useParams()

  return <EditSiteForm record={record} />
}

export default EditRecordPage

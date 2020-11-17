import React from 'react'
import { useParams } from 'react-router-dom'
import EditForm from '../components/EditForm'

const EditRecordPage = () => {
  const { record } = useParams()
  
  return <EditForm record={record} />
}

export default EditRecordPage


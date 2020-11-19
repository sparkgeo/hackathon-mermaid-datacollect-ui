import React from 'react'
import { useParams } from 'react-router-dom'
import FormEditSite from '../components/FormEditSite'

const EditRecordPage = () => {
  const { record } = useParams()

  return <FormEditSite record={record} />
}

export default EditRecordPage

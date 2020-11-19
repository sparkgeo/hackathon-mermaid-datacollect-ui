import React from 'react'
import FormCreateSite from '../components/FormCreateSite'
import { Helmet } from 'react-helmet'

export default function CreateRecordPage() {
  return (
    <>
      <Helmet>
        <title>Create new site</title>
      </Helmet>
      <FormCreateSite />
    </>
  )
}

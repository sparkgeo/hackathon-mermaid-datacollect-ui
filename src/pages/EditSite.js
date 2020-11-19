import React, { useEffect, useReducer, useState } from 'react'
import { useParams } from 'react-router-dom'
import FormEditSite from '../components/FormEditSite'
import { Heading } from 'grommet'

import { DataStore } from '@aws-amplify/datastore'
import { Site } from '../models'

import {
  fetchRecord,
  // singleRecordSubscription
} from '../lib/api'

const singleRecordSubscription = ({ cb, id }) => {
  return DataStore.observe(Site, id).subscribe(async (event) => {
    console.log('Subscription event ', event)
    const { element: record } = event
    cb(record)
  })
}

const initialState = {
  originalRecord: {},
  currentValues: {
    exposure: null,
    reefType: null,
    reefZone: null,
    country: null,
    notes: null,
    name: null,
    latitude: null,
    longitude: null,
  },
  loading: true,
  error: null,
}

function reducer(state, action) {
  switch (action.type) {
    case 'reset-form':
      return initialState
    case 'set-form':
      return {
        originalRecord: action.form,
        currentValues: action.form,
        loading: false,
      }
    case 'update-form':
      return {
        ...state,
        currentValues: {
          ...state.currentValues,
          [action.element]: action.value,
        },
      }

    default:
      throw new Error('Unknown reducer case "' + action.type + '" called.')
  }
}

const EditSitePage = () => {
  const { record } = useParams()
  const [siteContent, dispatch] = useReducer(reducer, initialState)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const setForm = (form) => dispatch({ type: 'set-form', form })
  const setFormElement = ({ element, value }) =>
    dispatch({ type: 'update-form', element, value })
  const resetForm = () => dispatch({ type: 'reset-form' })

  // Reset reducer on page dismount
  useEffect(() => {
    return () => resetForm()
  }, [])

  // Fetch data on initial load
  useEffect(() => {
    fetchRecord(record)
      .then((res) => {
        setForm(res)
        setLoading(false)
      })
      .catch(setError)
  }, [])

  // Make subscription for when site is changed in front of user's eyes
  useEffect(() => {
    const cb = (record) => {
      if (record) setForm(record)
    }

    const subscription = singleRecordSubscription({ id: record, cb }) || null

    return () => {
      if (subscription) {
        subscription.unsubscribe()
      }
    }
  }, [])

  if (loading) return <Heading>Loading</Heading>
  if (error)
    return (
      <>
        <Heading>Error</Heading>
      </>
    )

  return (
    <>
      <FormEditSite siteContent={siteContent} setFormElement={setFormElement} />
    </>
  )
}

export default EditSitePage

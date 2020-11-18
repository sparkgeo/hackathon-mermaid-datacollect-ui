import React, { useEffect, useState } from 'react'

import { Hub } from '@aws-amplify/core'
import { DataStore, Predicates } from '@aws-amplify/datastore'
import { Site } from '../models'

import { retrieveAllRecords } from '../lib/api'
import TableSites from '../components/TableSites'

export default function HomePage() {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    // Create listener that will stop observing the model once the sync process is done
    const removeListener = Hub.listen('datastore', async (capsule) => {
      const {
        payload: { event, data },
      } = capsule

      console.log('DataStore event', event, data)

      if (event === 'ready') {
        const sites = await DataStore.query(Site, Predicates.ALL, {
          // page: 0,
          // limit: 15,
        })
        setLoading(false)
        setRecords(sites)
      }
    })

    // Start the DataStore, this kicks-off the sync process.
    DataStore.start()

    return () => {
      removeListener()
    }
  }, [])

  if (loading) return <h1>loading</h1>
  if (error) return <h1>{error}</h1>

  return <TableSites sites={records} />
}

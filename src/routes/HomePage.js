import React, { useEffect, useState } from 'react'

import {
  retrieveAllRecords,
  allRecordSubscription,
  startServer,
} from '../lib/api'

import TableSites from '../components/TableSites'

export default function HomePage() {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    // Create listener that will stop observing the model once the sync process is done

    retrieveAllRecords()
      .then((records) => {
        setRecords(records)
        setLoading(false)
      })
      .catch((e) => setError(e))

    // Start the DataStore, this kicks-off the sync process.
    startServer()

    const subscription = allRecordSubscription({ cb: setRecords })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  if (loading) return <h1>loading</h1>
  if (error) return <h1>{error}</h1>

  return <TableSites sites={records} />
}

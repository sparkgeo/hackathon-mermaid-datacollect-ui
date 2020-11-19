import React, { useEffect, useState } from 'react'

import {
  retrieveAllRecords,
  allRecordSubscription,
  startServer,
} from '../lib/api'
import { Heading } from 'grommet'
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
  if (error)
    return (
      <>
        <Heading>{error}</Heading>
      </>
    )

  return <TableSites sites={records} />
}

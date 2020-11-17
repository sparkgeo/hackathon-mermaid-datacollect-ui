import React, { useEffect, useState } from 'react'

import { retrieveAllRecords } from '../lib/api'

export default function HomePage() {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const retrieveRecords = async () => {
      const data = await retrieveAllRecords().catch((e) => {
        console.error(e)
        setLoading(false)
        setError('API Loading Error')
      })

      setRecords(data ?? [])
      setLoading(false)
    }
    retrieveRecords()
  }, [])

  if (loading) return <h1>loading</h1>
  if (error) return <h1>{error}</h1>

  return <div>Home Page</div>
}

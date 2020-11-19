import { DataStore } from '@aws-amplify/datastore'
import { Site } from '../models'

export const startAppsyncServer = () => {
  DataStore.start()
}

export const retrieveAllAppsyncRecords = async () => await DataStore.query(Site)

export const deleteAppsyncRecord = async (id) => {
  await DataStore.delete(Site, id)
}

export const createAppsyncRecord = async (data) => {
  await DataStore.save(new Site(data))
}

export const fetchAppsyncRecord = async (id) => {
  const site = await DataStore.query(Site, id).catch((e) => {
    throw Error(e)
  })
  return site
}

export const clearLocalAppsyncData = async () => await DataStore.clear()

// Returns a fn that allows for the component to unsub
export const allRecordAppsyncSubscription = ({ cb }) =>
  DataStore.observe(Site).subscribe((event) => {
    console.log('Subscription event ', event)
    DataStore.query(Site).then((records) => {
      console.log('CB ', cb)
      cb(records)
    })
  })

export const singleRecordAppsyncSubscription = ({ cb, id }) =>
  DataStore.observe(Site, id).subscribe((event) => {
    console.log('Subscription event ', event)
    DataStore.query(Site, id).then((record) => {
      console.log('CB ', cb)
      cb(record)
    })
  })

export const updateAppsyncRecordFields = ({ originalRecord, fields }) => {
  DataStore.save(
    Site.copyOf(originalRecord, (updated) => {
      Object.keys(fields).forEach((field) => (updated[field] = fields[field]))
    }),
  )
}

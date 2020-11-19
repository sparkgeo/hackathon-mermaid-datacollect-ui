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
// Returns a fn that allows for the component to unsub
export const allRecordAppsyncSubscription = ({ cb }) => {
  console.log('allRecordAppsyncSubscription')
  return DataStore.observe(Site).subscribe(async (event) => {
    console.log('allRecordAppsyncSubscription: Subscription event ', event)
    const records = await retrieveAllAppsyncRecords()
    cb(records)
  })
}
export const singleRecordAppsyncSubscription = ({ cb, id }) => {
  console.log('singleRecordAppsyncSubscription')
  return DataStore.observe(Site, id).subscribe(async (event) => {
    console.log('singleRecordAppsyncSubscription: Subscription event ', event)
    const record = await fetchAppsyncRecord(id)
    cb(record)
  })
}

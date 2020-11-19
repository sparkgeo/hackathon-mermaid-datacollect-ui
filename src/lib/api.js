import { DataStore } from '@aws-amplify/datastore'
import { Site } from '../models'

export const startServer = () => {
  DataStore.start()
}

export const retrieveAllRecords = async () => await DataStore.query(Site)

export const deleteRecord = async (id) => {
  await DataStore.delete(Site, id)
}

export const createRecord = async (data) => {
  await DataStore.save(new Site(data))
}

export const clearLocalData = async () => await DataStore.clear()

// Returns a fn that allows for the component to unsub
export const allRecordSubscription = ({ cb }) =>
  DataStore.observe(Site).subscribe(() => {
    DataStore.query(Site).then((records) => {
      console.log('CB ', cb)
      cb(records)
    })
  })

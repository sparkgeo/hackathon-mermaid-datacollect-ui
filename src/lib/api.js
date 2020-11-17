import { DataStore } from '@aws-amplify/datastore'
import { Site } from '../models'

export const retrieveAllRecords = async () => await DataStore.query(Site)

export const deleteRecord = async (id) => await DataStore.delete(Site, id)

export const clearLocalData = async () => await DataStore.clear()

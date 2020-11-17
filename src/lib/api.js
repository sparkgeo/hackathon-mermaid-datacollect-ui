import { DataStore } from '@aws-amplify/datastore'
import { Site } from '../models'

export const retrieveAllRecords = async () => await DataStore.query(Site)

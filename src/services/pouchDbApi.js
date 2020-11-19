// import { DataStore } from '@aws-amplify/datastore'
// import { Site } from '../models'

export const startPouchdbServer = () => {
  console.log('startPouchdbServer')
}

export const retrieveAllPouchdbRecords = async () => {
  console.log('retrieveAllPouchdbRecords')
}

export const deletePouchdbRecord = async (id) => {
  console.log('deletePouchdbRecord')
}

export const createPouchdbRecord = async (data) => {
  console.log('createPouchdbRecord')
}

export const fetchPouchdbRecord = async (id) => {
  console.log('fetchPouchdbRecord')
  return {}
}

export const clearLocalPouchdbData = async () => {
  console.log('clearLocalPouchdbData')
}

// Returns a fn that allows for the component to unsub
export const allRecordPouchdbSubscription = ({ cb }) => {
  console.log('allRecordPouchdbSubscription')
}

export const singleRecordPouchdbSubscription = ({ cb, id }) => {
  console.log('allRecordPouchdbSubscription')
}

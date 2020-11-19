import {
  startAppsyncServer,
  retrieveAllAppsyncRecords,
  deleteAppsyncRecord,
  createAppsyncRecord,
  fetchAppsyncRecord,
  clearLocalAppsyncData,
  allRecordAppsyncSubscription,
  singleRecordAppsyncSubscription,
  updateAppsyncRecordFields,
} from '../services/appSyncApi'

let startServerFn
let retrieveAllRecordsFn
let deleteRecordFn
let createRecordFn
let fetchRecordFn
let clearLocalDataFn
let allRecordSubscriptionFn
let singleRecordSubscriptionFn
let updateRecordFieldsFn

if (process.env.REACT_APP_API_MODE === 'amplify') {
  startServerFn = startAppsyncServer
  retrieveAllRecordsFn = retrieveAllAppsyncRecords
  deleteRecordFn = deleteAppsyncRecord
  createRecordFn = createAppsyncRecord
  fetchRecordFn = fetchAppsyncRecord
  clearLocalDataFn = clearLocalAppsyncData
  allRecordSubscriptionFn = allRecordAppsyncSubscription
  singleRecordSubscriptionFn = singleRecordAppsyncSubscription
  updateRecordFieldsFn = updateAppsyncRecordFields
} else {
  startServerFn = () => {
    throw Error('Not initialized')
  }

  retrieveAllRecordsFn = async () => {
    throw Error('Not initialized')
  }

  deleteRecordFn = async (id) => {
    throw Error('Not initialized')
  }

  createRecordFn = async (data) => {
    throw Error('Not initialized')
  }

  fetchRecordFn = async (id) => {
    throw Error('Not initialized')
  }

  clearLocalDataFn = async () => {
    throw Error('Not initialized')
  }

  updateRecordFieldsFn = async () => {
    throw Error('Not initialized')
  }

  // Returns a fn that allows for the component to unsub
  allRecordSubscriptionFn = ({ cb }) => {
    throw Error('Not initialized')
  }

  singleRecordSubscriptionFn = ({ cb, id }) => {
    throw Error('Not initialized')
  }
}

export const startServer = startServerFn
export const retrieveAllRecords = retrieveAllRecordsFn
export const deleteRecord = deleteRecordFn
export const createRecord = createRecordFn
export const fetchRecord = fetchRecordFn
export const clearLocalData = clearLocalDataFn
export const allRecordSubscription = allRecordSubscriptionFn
export const singleRecordSubscription = singleRecordSubscriptionFn
export const updateRecordFields = updateRecordFieldsFn

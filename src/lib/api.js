import {
  startAppsyncServer,
  retrieveAllAppsyncRecords,
  deleteAppsyncRecord,
  createAppsyncRecord,
  fetchAppsyncRecord,
  clearLocalAppsyncData,
  allRecordAppsyncSubscription,
  singleRecordAppsyncSubscription,
} from '../services/appSyncApi'

import {
  startPouchdbServer,
  retrieveAllPouchdbRecords,
  deletePouchdbRecord,
  createPouchdbRecord,
  fetchPouchdbRecord,
  clearLocalPouchdbData,
  allRecordPouchdbSubscription,
  singleRecordPouchdbSubscription,
} from '../services/pouchDbApi'

let startServerFn
let retrieveAllRecordsFn
let deleteRecordFn
let createRecordFn
let fetchRecordFn
let clearLocalDataFn
let allRecordSubscriptionFn
let singleRecordSubscriptionFn

if (process.env.REACT_APP_API_MODE === 'amplify') {
  startServerFn = startAppsyncServer
  retrieveAllRecordsFn = retrieveAllAppsyncRecords
  deleteRecordFn = deleteAppsyncRecord
  createRecordFn = createAppsyncRecord
  fetchRecordFn = fetchAppsyncRecord
  clearLocalDataFn = clearLocalAppsyncData
  allRecordSubscriptionFn = allRecordAppsyncSubscription
  singleRecordSubscriptionFn = singleRecordAppsyncSubscription
} else {
  startServerFn = startPouchdbServer
  retrieveAllRecordsFn = retrieveAllPouchdbRecords
  deleteRecordFn = deletePouchdbRecord
  createRecordFn = createPouchdbRecord
  fetchRecordFn = fetchPouchdbRecord
  clearLocalDataFn = clearLocalPouchdbData
  allRecordSubscriptionFn = allRecordPouchdbSubscription
  singleRecordSubscriptionFn = singleRecordPouchdbSubscription
}

export const startServer = startServerFn
export const retrieveAllRecords = retrieveAllRecordsFn
export const deleteRecord = deleteRecordFn
export const createRecord = createRecordFn
export const fetchRecord = fetchRecordFn
export const clearLocalData = clearLocalDataFn
export const allRecordSubscription = allRecordSubscriptionFn
export const singleRecordSubscription = singleRecordSubscriptionFn

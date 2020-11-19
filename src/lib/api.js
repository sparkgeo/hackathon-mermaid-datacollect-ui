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

import {
  startPouchdbServer,
  retrieveAllPouchdbRecords,
  deletePouchdbRecord,
  createPouchdbRecord,
  fetchPouchdbRecord,
  clearLocalPouchdbData,
  allRecordPouchdbSubscription,
  singleRecordPouchdbSubscription,
  updatePouchdbRecordFields,
} from '../services/pouchDbApi'

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
  startServerFn = startPouchdbServer
  retrieveAllRecordsFn = retrieveAllPouchdbRecords
  deleteRecordFn = deletePouchdbRecord
  createRecordFn = createPouchdbRecord
  fetchRecordFn = fetchPouchdbRecord
  clearLocalDataFn = clearLocalPouchdbData
  updateRecordFieldsFn = updatePouchdbRecordFields
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
export const updateRecordFields = updateRecordFieldsFn

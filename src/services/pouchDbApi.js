// import { DataStore } from '@aws-amplify/datastore'
// import { Site } from '../models'
import PouchDB from 'pouchdb'
import { v4 as uuidv4 } from 'uuid';
// import Observable from 'zen-observable-ts';
import { BehaviorSubject } from 'rxjs';

var db = new PouchDB('mermaid_sites');
const _recs = new BehaviorSubject([])

function getSites(rows) {
  let sites = []
  rows.forEach(function(site) {
    site.doc.id = site.doc._id
    sites.push(site.doc);
  });
  return sites
}

export const startPouchdbServer = () => {
  console.log('startPouchdbServer')

  // db.changes({
  //   since: 'now',
  //   live: true
  // }).on('change', retrieveAllPouchdbRecords);
}

export const retrieveAllPouchdbRecords = async () => {
  console.log('retrieveAllPouchdbRecords')
  let docs = await db.allDocs({include_docs: true})
  // console.log('docs.rows', docs.rows)
  return getSites(docs.rows)

}

export const deletePouchdbRecord = async (id) => {
  console.log('deletePouchdbRecord', id)
  let site = await db.get(id)
  await db.remove(site);
  _recs.next(null)
}

export const createPouchdbRecord = async (data) => {
  console.log('createPouchdbRecord', data)
  data._id = uuidv4()
  await db.put(data)
}

export const updatePouchdbRecordFields = async (originalRecord, fields) => {
  console.log('updatePouchdbRecordFields', originalRecord, fields)
  // DataStore.save(
  //   Site.copyOf(originalRecord, (updated) => {
  //     Object.keys(fields).forEach((field) => (updated[field] = fields[field]))
  //   }),
  // )
}


export const fetchPouchdbRecord = async (id) => await db.get(id)

export const clearLocalPouchdbData = async () => await db.destroy()

// Returns a fn that allows for the component to unsub
export const allRecordPouchdbSubscription = ({ cb }) => {
  console.log('allRecordPouchdbSubscription')

  return _recs.subscribe(async (newData) => {
    console.log('newData', newData)
    //   console.log('allRecordPouchdbSubscription: Subscription event ', event)
      const records = await retrieveAllPouchdbRecords()
      cb(records)
  })
}

export const singleRecordPouchdbSubscription = ({ cb, id }) => {
  console.log('singleRecordPouchdbSubscription')
}

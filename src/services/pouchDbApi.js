// import { DataStore } from '@aws-amplify/datastore'
// import { Site } from '../models'
import PouchDB from 'pouchdb'
import { v4 as uuidv4 } from 'uuid';
// import Observable from 'zen-observable-ts';
import { Observable, from } from 'rxjs';

var db = new PouchDB('mermaid_sites');

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
}

export const createPouchdbRecord = async (data) => {
  console.log('createPouchdbRecord', data)
  data._id = uuidv4()
  await db.put(data)
}

export const fetchPouchdbRecord = async (id) => await db.get(id)

export const clearLocalPouchdbData = async () => await db.destroy()

// Returns a fn that allows for the component to unsub
export const allRecordPouchdbSubscription = ({ cb }) => {
  console.log('allRecordPouchdbSubscription')

  const observable = from(retrieveAllPouchdbRecords())

  // const observable = new Observable(subscriber => {
  //   console.log('subscriber', subscriber)
  //   retrieveAllPouchdbRecords().then((records) => {
  //     records.forEach((rec) => {
  //       subscriber.next(rec);
  //     })
  //     subscriber.complete();
  //   })
  // });

  return observable.subscribe(async (event) => {
    console.log('allRecordPouchdbSubscription: Subscription event ', event)
    const records = await retrieveAllPouchdbRecords()
    cb(records)
  })

  // let arrPromise = db.allDocs({include_docs: true})
  // let observable = Observable.from(arrPromise)
  
  // observable.subscribe(() => {
  //   arrPromise.then((records) => {
  //     console.log('records ', records)
  //     cb(records)
  //   })
  // })
  

}

export const singleRecordPouchdbSubscription = ({ cb, id }) => {
  console.log('singleRecordPouchdbSubscription')
}

// db.changes({
//   since: 'now',
//   live: true
// }).on('change', retrieveAllPouchdbRecords); 

// import { DataStore } from '@aws-amplify/datastore'
// import { Site } from '../models'
import PouchDB from 'pouchdb'
import { v4 as uuidv4 } from 'uuid';
// import Observable from 'zen-observable-ts';
import { BehaviorSubject } from 'rxjs';

var db = new PouchDB('mermaid_sites');
var host = 'localhost'
var remoteCouch = `http://admin:password@${host}:5984/mermaid_sites`;

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
  db.sync(remoteCouch, {live: true})
    .on('change', function (info) {
      console.log('change', info);
      // showTodos();
    })
    .on('paused', function () {
      console.log('paused');
      // console.warn(err);
    })
    .on('active', function (msg) {
      console.log('active', msg);
    })
    .on('denied', function (err) {
      console.log('denied', err);
      // console.error(err);
    })
    .on('complete', function (info) {
      console.log("complete", info)
      // showTodos();
    })
    .on('error', function (err) {
      console.log('error', err);
      // syncError();
    });
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

export const updatePouchdbRecordFields = async ({ originalRecord, fields }) => {
  console.log('updatePouchdbRecordFields', originalRecord)

  for (const [key, value] of Object.entries(fields)) {
    console.log(`${key}: ${value}`);
  }

  Object.keys(fields).forEach((field) => (originalRecord[field] = fields[field]))
  
  // .forEach(function(f) {
  //   console.log(f)
  // })
  //   (field) => {
  //     console.log(field)
  //     // originalRecord[field] = fields[field]
  //   }
  // )
  console.log('updatedRecord', originalRecord);
  await db.get(originalRecord._id).then(function(doc) {
    console.log('doc', doc);

    return db.put(doc).then(function(r) {
      _recs.next(r)
    });
  })
  // await db.put(originalRecord)
  // _recs.next(originalRecord)
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

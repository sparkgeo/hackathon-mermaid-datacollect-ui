import PouchDB from 'pouchdb'
import { v4 as uuidv4 } from 'uuid';
import { BehaviorSubject } from 'rxjs';

var db = new PouchDB('mermaid_sites');
var host = 'localhost'
var remoteCouch = `http://admin:password@${host}:5984/mermaid_sites`;

const _recs = new BehaviorSubject([])
const _rec = new BehaviorSubject({}) //for edited records

function getSites(rows) {
  let sites = []
  rows.forEach(function(site) {
    site.doc.id = site.doc._id
    sites.push(site.doc);
  });
  return sites
}

// db.changes({
//   since: 'now',
//   live: true
// }).on('change', (evt) => {
//   console.log('change evt: ', evt)
// });

export const startPouchdbServer = () => {
  console.log('startPouchdbServer')

  
  db.sync(remoteCouch, {live: true})
    .on('change', function (info) {
      console.log('change', info);
    })
    .on('paused', function () {
      console.log('paused');
    })
    .on('active', function (msg) {
      console.log('active', msg);
    })
    .on('denied', function (err) {
      console.log('denied', err);
    })
    .on('complete', function (info) {
      console.log("complete", info)
    })
    .on('error', function (err) {
      console.log('error', err);
    });
}

export const retrieveAllPouchdbRecords = async () => {
  console.log('retrieveAllPouchdbRecords')
  let docs = await db.allDocs({include_docs: true})
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

  Object.keys(fields).forEach((field) => (originalRecord[field] = fields[field]))
  
  await db.put(originalRecord).then((r) => {
    _rec.next(r)
  })
}

export const fetchPouchdbRecord = async (id) => {
  var obj = await db.get(id)
  obj.id = obj._id
  return obj
}

export const clearLocalPouchdbData = async () => await db.destroy()

// Returns a fn that allows for the component to unsub
export const allRecordPouchdbSubscription = ({ cb }) => {
  console.log('allRecordPouchdbSubscription')

  return _recs.subscribe(async () => {
      const records = await retrieveAllPouchdbRecords()
      cb(records)
  })
}

export const singleRecordPouchdbSubscription = ({ cb, id }) => {
  console.log('singleRecordPouchdbSubscription')

  return _rec.subscribe(async () => {
      const record = await fetchPouchdbRecord(id)
      cb(record)
  })

}

import PouchDB from 'pouchdb'
import { v4 as uuidv4 } from 'uuid';
import { BehaviorSubject } from 'rxjs';

var host = process.env.REACT_APP_COUCHDB_URL || 'not working'
var dbname = process.env.REACT_APP_COUCHDB_DBNAME || 'mermaid'
var remoteCouch = `${host}/${dbname}`;

var db = new PouchDB(dbname);

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
  // data._id = uuidv4()

  // gross but running out of time
  const date = new Date()

  const pouchSchemaCompliantRecord = {
    _id: uuidv4(),
    updated_by: "7901c943-5370-4896-a9ed-4b6ff5cb6ba0",
    created_on: date.toISOString(),
    updated_on: date.toISOString(),
    data: null,
    name: data.name,
    location: {
      type: "Point",
      coordinates: [
        data.longitude,
        data.latitude
      ]
    },
    notes: data.notes,
    created_by: "7901c943-5370-4896-a9ed-4b6ff5cb6ba0",
    project: "8c213ce8-7973-47a5-9359-3a0ef12ed203",
    country: data.country,
    reef_type: data.reefType,
    reef_zone: data.reefZone,
    exposure: data.exposure,
    predecessor: null
  }

  await db.put(pouchSchemaCompliantRecord)
}

export const updatePouchdbRecordFields = async ({ originalRecord, fields }) => {
  console.log('updatePouchdbRecordFields', originalRecord)

  Object.keys(fields).forEach((field) => (originalRecord[field] = fields[field]))

  // gross but running out of time
  const date = new Date()
  const pouchSchemaCompliantRecord = {
    _id: originalRecord.id,
    updated_by: "7901c943-5370-4896-a9ed-4b6ff5cb6ba0",
    created_on: originalRecord.created_on,
    updated_on: date.toISOString(),
    data: null,
    name: originalRecord.name,
    location: {
      type: "Point",
      coordinates: [
        originalRecord.longitude,
        originalRecord.latitude
      ]
    },
    notes: originalRecord.notes,
    created_by: "7901c943-5370-4896-a9ed-4b6ff5cb6ba0",
    project: "8c213ce8-7973-47a5-9359-3a0ef12ed203",
    country: originalRecord.country,
    reef_type: originalRecord.reefType,
    reef_zone: originalRecord.reefZone,
    exposure: originalRecord.exposure,
    predecessor: null,
    _rev: originalRecord._rev
  }
  
  await db.put(pouchSchemaCompliantRecord).then((r) => {
    _rec.next(r)
  })
}

export const fetchPouchdbRecord = async (id) => {
  var obj = await db.get(id)

  // gross but running out of time
  obj.id = obj._id
  obj.longitude = obj.location.coordinates[0]
  obj.latitude = obj.location.coordinates[1]
  obj.reefType = obj.reef_type
  obj.reefZone = obj.reef_zone
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

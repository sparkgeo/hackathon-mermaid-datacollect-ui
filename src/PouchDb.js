import PouchDB from 'pouchdb'
// var PouchDB = require('pouchdb');

const host = process.env.COUCHDB_HOST || 'couchdb'
const remoteCouch = `http://admin:password@${host}:5984/mermaid_sites`

export default class PBD {
  constructor() {
    this.db = new PouchDB('mermaid_sites')

    // this.db.changes({
    //   since: 'now',
    //   live: true
    // }).on('change', getAllSites);  

  }

  syncPDB() {
    this.db.replicate.to(remoteCouch)
    this.db.replicate.from(remoteCouch)

    // var opts = {live: true};
    // _sync = this.db.sync(remoteCouch, opts)
    //   .on('change', function (info) {
    //     console.log('change', info);
    //     // showTodos();
    //   })
    //   .on('paused', function () {
    //     console.log('paused');
    //     // console.warn(err);
    //   })
    //   .on('active', function (msg) {
    //     console.log('active', msg);
    //   })
    //   .on('denied', function (err) {
    //     console.log('denied', err);
    //     // console.error(err);
    //   })
    //   .on('complete', function (info) {
    //     console.log("complete", info)
    //     // showTodos();
    //   })
    //   .on('error', function (err) {
    //     console.log('error', err);
    //     // syncError();
    //   });
  }

  async getAllSites() {
    let allSites = await this.db.allDocs({ include_docs: true })
    let sites = {}

    allSites.rows.forEach((s) => (sites[s.id] = s.doc))

    return sites
  }

  saveSite(site_id, new_data) {
    const {
      name,
      country,
      reef_exposure,
      reef_type,
      reef_zone,
      notes,
    } = new_data

    this.db
      .get(site_id)
      .then((doc) => {
        return this.db.put({
          _id: site_id,
          _rev: doc._rev,
          name,
          country,
          reef_exposure,
          reef_type,
          reef_zone,
          notes,
        })
      })
      .then((response) => {
        console.log('response ', response)
        this.syncPDB()
      })
  }
}

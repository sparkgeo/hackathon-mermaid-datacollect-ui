import PouchDB from 'pouchdb'

const host =
  'Couch-Ec2Se-9MCN7MODIJHE-3c33f59f32c743f7.elb.us-west-2.amazonaws.com'
const localhost = 'localhost'
const remoteCouch = `http://admin:password@${localhost}:5984/mermaid_sites`

export default class PBD {
  constructor() {
    this.db = new PouchDB('mermaid_sites')
  }

  syncPDB() {
    this.db.replicate.to(remoteCouch)
    this.db.replicate.from(remoteCouch)
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

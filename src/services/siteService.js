import PouchDB from 'pouchdb'

class SiteService {
  clientDb
  #remoteDb
  constructor() {
    this.clientDb = new PouchDB('test')

    this.#remoteDb = new PouchDB(`http://admin:password@127.0.0.1:5984/test`)
    PouchDB.sync(this.clientDb, this.#remoteDb, {
      live: true,
      heartbeat: false,
      timeout: false,
      retry: true,
    })
  }
  newSite = (site) => {
    const siteWithIdIfNecessary = {
      _id: new Date().toISOString(),
      ...site,
    }
    return this.clientDb.put(siteWithIdIfNecessary)
  }

  getSites = () => {
    return this.clientDb.allDocs({ include_docs: true, descending: true })
  }
}

export default SiteService

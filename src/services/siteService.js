import PouchDB from 'pouchdb'
import * as turf from '@turf/turf'

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
    return this.clientDb.allDocs({ include_docs: true })
  }

  getSimilarSites = (location) => {
    const isSiteSimilar = (site) => {
      const locationPoint = turf.point(location)
      const sitePoint = turf.point([site.lat, site.lng])
      return (
        // I made this distance bigger than current mermaid, just for demo purposes
        turf.distance(locationPoint, sitePoint, { units: 'meters' }) < 10000
      )
    }

    return this.clientDb
      .allDocs({ include_docs: true })
      .then((response) =>
        response.rows
          .map((row) => row.doc)
          .filter((site) => isSiteSimilar(site)),
      )
  }
}

export default SiteService

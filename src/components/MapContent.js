import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useMapEvents, Marker, TileLayer, useMap, Popup } from 'react-leaflet'
import * as L from 'leaflet'

function MapContent(props) {
  const { setMarkerPosition, markerPosition, similarSites } = props

  const map = useMap()

  const similarSiteIcon = new L.icon({ iconUrl: 'similarSite.png' })

  useMapEvents({
    click: (e) => {
      setMarkerPosition([e.latlng.lat.toFixed(3), e.latlng.lng.toFixed(3)])
    },
  })

  // useEffect(() => {
  //   if (similarSites.length > 0) {
  //     map.setView(markerPosition, 10)
  //   }
  // }, [similarSites, map, markerPosition])

  return (
    <>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={markerPosition}></Marker>
      {similarSites.map((site) => (
        <Marker
          key={site._id}
          position={[site.lat, site.lng]}
          icon={similarSiteIcon}
        >
          <Popup>
            <b>{site.name}</b>
            <button>Edit</button>
          </Popup>
        </Marker>
      ))}
    </>
  )
}

MapContent.propTypes = {
  setMarkerPosition: PropTypes.func.isRequired,
  markerPosition: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  ).isRequired,
}

export default MapContent

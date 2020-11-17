import React from 'react'
import PropTypes from 'prop-types'
import { useMapEvents, Marker, TileLayer } from 'react-leaflet'

function MapContent(props) {
  const { setMarkerPosition, markerPosition } = props

  useMapEvents({
    click: e => {
      setMarkerPosition([e.latlng.lat.toFixed(3), e.latlng.lng.toFixed(3)])
    },
  })

  return (
    <>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={markerPosition}></Marker>
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

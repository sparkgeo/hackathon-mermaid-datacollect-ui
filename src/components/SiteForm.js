import React, { useEffect, useState } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import { marker } from 'leaflet'
import {
  Box,
  Button,
  Text,
  FormField,
  Form,
  TextArea,
  TextInput,
  Select,
} from 'grommet'

import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvents,
} from 'react-leaflet'

import Breadcrumbs from './Breadcrumbs'
import MapContent from './MapContent'

import PDB from '../pdb'
import convertToName from '../helpers/convertToName'
import countries from '../lib/countries'
import reef_types from '../lib/reef_types'
import reef_zones from '../lib/reef_zones'
import reef_exposures from '../lib/reef_exposures'

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
})

L.Marker.prototype.options.icon = DefaultIcon

function SiteForm({ site, addNew, status }) {
  const pdb = new PDB()
  const { id } = useParams()
  const [redirectTarget, setRedirectTarget] = useState(null)
  const [markerPosition, setMarkerPosition] = useState([-12.477, 160.307])
  const [siteName, setSiteName] = useState('')
  const [siteCountry, setSiteCountry] = useState('')
  const [reefExposure, setReefExposure] = useState('')
  const [reefType, setReefType] = useState('')
  const [reefZone, setReefZone] = useState('')
  const [siteNotes, setSiteNotes] = useState('')

  useEffect(() => {
    async function fetchSite() {
      const siteView = await pdb.getSite(id)
      if (siteView.name) setSiteName(siteView.name)
      if (siteView.country)
        setSiteCountry(convertToName(siteView.country, countries))
      if (siteView.reef_exposure)
        setReefExposure(convertToName(siteView.reef_exposure, reef_exposures))
      if (siteView.reef_type)
        setReefType(convertToName(siteView.reef_type, reef_types))
      if (siteView.reef_zone)
        setReefZone(convertToName(siteView.reef_zone, reef_zones))
      if (siteView.notes) setSiteNotes(siteView.notes)
    }

    if (id) fetchSite()
  }, [id])

  // ! This is where can carry out actions based on the data in the form.
  function submitData({ value: formContent }) {
    formContent.country = countries[formContent.country]
    formContent.reef_type = reef_types[formContent.reef_type]
    formContent.reef_exposure = reef_exposures[formContent.reef_exposure]
    formContent.reef_zone = reef_zones[formContent.reef_zone]
    if (addNew) {
      pdb.addNewSite(formContent, setRedirectTarget)
    } else {
      console.log('Submit triggered. Data : ', formContent)
      pdb.saveSite(site._id, formContent)
    }
  }

  const handleNameChange = (event) => setSiteName(event.target.value)
  const handleNotesChange = (event) => setSiteNotes(event.target.value)

  if (redirectTarget) return <Redirect to={`/sites/${redirectTarget}`} />

  if (status === 'loading') return <Box>Loading</Box>

  return (
    <Box>
      <Box
        direction="row"
        pad={{ horizontal: 'small' }}
        justify="between"
        height="xsmall"
        border={{ bottom: 'xsmall' }}
      >
        <Breadcrumbs siteName={siteName} />
      </Box>
      <Box
        margin="small"
        border={{ size: 'xsmall', color: 'dark-3' }}
        width="fill"
        height="large"
        direction="column"
        overflow={{ vertical: 'scroll' }}
      >
        <Form onSubmit={submitData}>
          <Box>
            <Box
              height="xxsmall"
              width="xxlarge"
              background="light-4"
              border={{ size: 'xsmall', color: 'dark-3', side: 'bottom' }}
            />
            <Box margin="small">
              <FormField label="Name" name="name" required>
                <TextInput
                  name="name"
                  value={siteName}
                  onChange={handleNameChange}
                />
              </FormField>
            </Box>
            <Box direction="row">
              <Box
                direction="column"
                margin="medium"
                width="medium"
                pad={{ horizontal: 'medium' }}
              >
                <FormField label="Country" name="country" required>
                  <Select
                    options={Object.keys(countries)}
                    name="country"
                    value={siteCountry}
                    onChange={({ option }) => {
                      setSiteCountry(option)
                    }}
                  />
                </FormField>
                <FormField label="Latitude" name="lat" required>
                  <TextInput value={markerPosition[0]} name="lat" />
                </FormField>
                <Text size="small" color="dark-4">
                  Decimal Degrees
                </Text>
                <br />
                <FormField label="Longitude" name="lng" required>
                  <TextInput value={markerPosition[1]} name="lng" />
                </FormField>
                <Text size="small" color="dark-4">
                  Decimal Degrees
                </Text>
                <br />
              </Box>
              <Box width="fill" height="fill">
                <MapContainer
                  center={markerPosition}
                  zoom={4}
                  scrollWheelZoom
                  style={{ width: '800px', height: '400px' }}
                >
                  <MapContent
                    markerPosition={markerPosition}
                    setMarkerPosition={setMarkerPosition}
                  />
                </MapContainer>
              </Box>
            </Box>
            <Box margin="small">
              <FormField label="Exposure" name="reef_exposure" required>
                <Select
                  options={Object.keys(reef_exposures)}
                  name="reef_exposure"
                  value={reefExposure}
                  onChange={({ option }) => {
                    setReefExposure(option)
                  }}
                />
              </FormField>
              <FormField label="Reef Type" name="reef_type" required>
                <Select
                  options={Object.keys(reef_types)}
                  name="reef_type"
                  value={reefType}
                  onChange={({ option }) => {
                    setReefType(option)
                  }}
                />
              </FormField>
              <FormField label="Reef Zone" name="reef_zone" required>
                <Select
                  options={Object.keys(reef_zones)}
                  name="reef_zone"
                  value={reefZone}
                  onChange={({ option }) => {
                    setReefZone(option)
                  }}
                />
              </FormField>
            </Box>
            <hr />
            <Box margin="small">
              <FormField label="Notes" name="notes">
                <TextArea
                  id="text-area"
                  placeholder="placeholder"
                  name="notes"
                  value={siteNotes}
                  onChange={handleNotesChange}
                />
              </FormField>
            </Box>
            <Box
              pad={{ vertical: 'small' }}
              width="small"
              margin="small"
              direction="row"
              alignContent="between"
            >
              <Button label="Save" color="status-ok" type="submit" primary />
              {!addNew && (
                <Button
                  label="Delete"
                  color="status-error"
                  margin={{ left: '10px' }}
                  onClick={() => {
                    pdb.deleteSite(site._id)
                  }}
                />
              )}
            </Box>
          </Box>
        </Form>
      </Box>
    </Box>
  )
}

export default SiteForm

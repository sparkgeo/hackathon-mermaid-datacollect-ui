import React, { useState } from 'react'
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
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
import { MapContainer } from 'react-leaflet'
import L, { icon as leafletIcon } from 'leaflet'
import { Redirect } from 'react-router-dom'

import { createRecord } from '../lib/api'

import MapContent from './MapContent'

import { countries } from '../lib/countries'
import { reefTypes } from '../lib/reefTypes'
import { reefZones } from '../lib/reefZones'
import { reefExposures } from '../lib/reefExposures'

let DefaultIcon = leafletIcon({
  iconUrl: icon,
  shadowUrl: iconShadow,
})

L.Marker.prototype.options.icon = DefaultIcon

function NewSiteForm() {
  const [markerPosition, setMarkerPosition] = useState([-12.477, 160.307])
  const [redirect, setRedirect] = useState(false)

  // ! This is where can carry out actions based on the data in the form.
  function submitData({ value: formContent }) {
    formContent.exposure = reefExposures[formContent.exposure]
    formContent.reefType = reefTypes[formContent.reefType]
    formContent.reefZone = reefZones[formContent.reefZone]
    formContent.country = countries[formContent.country]

    createRecord(formContent)
      .then((response) => {
        console.log('It worked ', response)
        setRedirect(true)
      })
      .catch((e) => {
        console.warn('oh noooo 👨‍🚒 ', e)
      })
  }

  if (redirect) return <Redirect to="/" />

  return (
    <>
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
              width="fill"
              background="light-4"
              border={{ size: 'xsmall', color: 'dark-3', side: 'bottom' }}
            />
            <Box margin="small">
              <FormField label="Name" name="name" required>
                <TextInput name="name" />
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
                  <Select options={Object.keys(countries)} name="country" />
                </FormField>

                <FormField label="Latitude" name="latitude" required>
                  <TextInput
                    value={Number(markerPosition[0])}
                    name="latitude"
                    type="number"
                  />
                </FormField>
                <Text size="small" color="dark-4">
                  Decimal Degrees
                </Text>
                <br />
                <FormField label="Longitude" name="longitude" required>
                  <TextInput
                    value={Number(markerPosition[1])}
                    name="longitude"
                    type="number"
                  />
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
              <FormField label="Exposure" name="exposure" required>
                <Select options={Object.keys(reefExposures)} name="exposure" />
              </FormField>
              <FormField label="Reef Type" name="reefType" required>
                <Select options={Object.keys(reefTypes)} name="reefType" />
              </FormField>
              <FormField label="Reef Zone" name="reefZone" required>
                <Select options={Object.keys(reefZones)} name="reefZone" />
              </FormField>
            </Box>
            <hr />
            <Box margin="small">
              <FormField label="Notes" name="notes">
                <TextArea
                  id="text-area"
                  placeholder="placeholder"
                  name="notes"
                />
              </FormField>
            </Box>
            <Box pad={{ vertical: 'small' }} width="small" margin="small">
              <Button label="Save" color="status-ok" type="submit" primary />
            </Box>
          </Box>
        </Form>
      </Box>
    </>
  )
}

export default NewSiteForm

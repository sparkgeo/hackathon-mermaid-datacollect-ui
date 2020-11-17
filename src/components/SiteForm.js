import React, { useEffect, useState } from 'react'
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

import countries from '../lib/countries'

import PDB from '../PouchDb'


let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
})

L.Marker.prototype.options.icon = DefaultIcon

const reefTypes = {
  atoll: '16a0a961-df6d-42a5-86b8-bc30f87bab42',
  barrier: '2b99cdf4-9566-4e60-8700-4ec3b9c7e322',
  fringing: '19534716-b138-49b1-bbd8-420df9243413',
  lagoon: 'dc3aa6d3-2795-42bb-9771-39fbcdd3029d',
  patch: '7085ee02-2a2e-4b42-b61e-18a78f1b8d03',
}

const reefExposures = {
  ['very sheltered']: 'baa54e1d-4263-4273-80f5-35812304b592',
  ['sheltered']: '051c7545-eea8-48f6-bc82-3ef66bfdfe75',
  ['semi-exposed']: '85b26198-4e3b-459c-868c-4e0706828cce',
  ['exposed']: '997c6cb3-c5e5-4df6-9cfa-5814a58a7b9e',
}

const reefZones = {
  ['back reef']: '06ea17cd-5d1d-46ae-a654-64901e2a9f96',
  crest: '49c85161-99ee-4bc3-b6c4-09b5810da0a8',
  ['fore reef']: '0e5ac2d0-d1cc-4f04-a696-f6d3db2b9ca8',
  pinnacle: 'bc188a4f-76ae-4701-a021-26297efc9a92',
}

function SiteForm() {
  const [markerPosition, setMarkerPosition] = useState([-12.477, 160.307])
  const pdb = new PDB()


  // ! This is where can carry out actions based on the data in the form.
  function submitData({ value: formContent }) {
    formContent.reefType = reefTypes[formContent.reefType]
    formContent.exposure = reefExposures[formContent.exposure]
    formContent.reefZone = reefZones[formContent.reefZone]
    formContent.country = countries[formContent.country]

    console.log('Submit triggered. Data : ', formContent)
    // pdb.saveSite(site._id, formContent)

  }

  return (
    <>
      <Box
        direction="row"
        pad={{ horizontal: 'small' }}
        justify="between"
        height="xsmall"
        border={{ bottom: 'xsmall' }}
      >
        <Breadcrumbs />
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

export default SiteForm

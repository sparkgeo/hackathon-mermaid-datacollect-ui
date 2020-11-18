import React, { useEffect, useState } from 'react'
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import * as L from 'leaflet'
import { Button, FormField, Form, TextArea, TextInput, Select } from 'grommet'

import { MapContainer } from 'react-leaflet'

import MapContent from './MapContent'

import countries from '../lib/countries'
import { Column, ColumnPadded, Row } from './commonUI'

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
  'very sheltered': 'baa54e1d-4263-4273-80f5-35812304b592',
  sheltered: '051c7545-eea8-48f6-bc82-3ef66bfdfe75',
  'semi-exposed': '85b26198-4e3b-459c-868c-4e0706828cce',
  exposed: '997c6cb3-c5e5-4df6-9cfa-5814a58a7b9e',
}

const reefZones = {
  'back reef': '06ea17cd-5d1d-46ae-a654-64901e2a9f96',
  crest: '49c85161-99ee-4bc3-b6c4-09b5810da0a8',
  'fore reef': '0e5ac2d0-d1cc-4f04-a696-f6d3db2b9ca8',
  pinnacle: 'bc188a4f-76ae-4701-a021-26297efc9a92',
}

function SiteForm({ siteService }) {
  const [markerPosition, setMarkerPosition] = useState([-12.477, 160.307])

  // ! This is where can carry out actions based on the data in the form.
  function submitData({ value: formContent }) {
    formContent.reefType = reefTypes[formContent.reefType]
    formContent.exposure = reefExposures[formContent.exposure]
    formContent.reefZone = reefZones[formContent.reefZone]
    formContent.country = countries[formContent.country]
    siteService
      .newSite(formContent)
      .then((response) => console.log('success', response))
      .catch((err) => {
        console.log('error', err)
      })
  }

  return (
    <ColumnPadded>
      <Form onSubmit={submitData}>
        <Column>
          <h2>New Site</h2>

          <FormField label="Name" name="name" required>
            <TextInput name="name" />
          </FormField>

          <ColumnPadded>
            Location: click the map
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
            {`Latitude: ${markerPosition[0]} Londitude: ${markerPosition[1]}`}
          </ColumnPadded>
          <FormField label="Country" name="country" required>
            <Select options={Object.keys(countries)} name="country" />
          </FormField>
          <FormField label="Exposure" name="exposure" required>
            <Select options={Object.keys(reefExposures)} name="exposure" />
          </FormField>
          <FormField label="Reef Type" name="reefType" required>
            <Select options={Object.keys(reefTypes)} name="reefType" />
          </FormField>
          <FormField label="Reef Zone" name="reefZone" required>
            <Select options={Object.keys(reefZones)} name="reefZone" />
          </FormField>

          <FormField label="Notes" name="notes">
            <TextArea id="text-area" placeholder="placeholder" name="notes" />
          </FormField>

          <Button label="Save" color="status-ok" type="submit" primary />
        </Column>
      </Form>
    </ColumnPadded>
  )
}

export default SiteForm

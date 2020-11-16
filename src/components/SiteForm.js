import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Text,
  FormField,
  Form,
  TextArea,
  TextInput,
  Heading,
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

import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import { marker } from 'leaflet'

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
})

L.Marker.prototype.options.icon = DefaultIcon

function SiteForm() {
  const [markerPosition, setMarkerPosition] = useState([-12.477, 160.307])

  // ! This is where can carry out actions based on the data in the form.
  function submitData({ value: formContent }) {
    console.log('Submit triggered. Data : ', formContent)
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
                  <TextInput name="country" />
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
                <TextInput name="exposure" />
              </FormField>
              <FormField label="Reef Type" name="reefType" required>
                <TextInput name="reefType" />
              </FormField>
              <FormField label="Reef Zone" name="reefZone" required>
                <TextInput name="reefZone" />
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

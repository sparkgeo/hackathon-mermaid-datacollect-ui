import React from 'react'
import { Box, Text, FormField, Form, TextInput, Heading } from 'grommet'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'

function SiteForm() {
  return (
    <Box
      margin="medium"
      border={{ size: 'xsmall', color: 'dark-3' }}
      width="xxlarge"
      direction="column"
    >
      <Form>
        <Box>
          <Box
            height="xxsmall"
            width="xxlarge"
            background="light-4"
            border={{ size: 'xsmall', color: 'dark-3', side: 'bottom' }}
          />
          <Box margin="small">
            <FormField label="Name" required>
              <TextInput />
            </FormField>
          </Box>
          <Box direction="row">
            <Box direction="column" margin="medium" width="medium">
              <FormField label="Country" required>
                <TextInput />
              </FormField>

              <FormField label="Latitude" required>
                <TextInput />
              </FormField>
              <Text size="small" color="dark-4">
                Decimal Degrees
              </Text>
              <br />
              <FormField label="Longitude" required>
                <TextInput />
              </FormField>
              <Text size="small" color="dark-4">
                Decimal Degrees
              </Text>
              <br />
            </Box>
            <Box>
              <Heading>MAP</Heading>
              {/* <MapContainer center={[0, 0]} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[0, 0]}></Marker>
              </MapContainer> */}
            </Box>
          </Box>
          <Box margin="small">
            <FormField label="Exposure" required>
              <TextInput />
            </FormField>
            <FormField label="Reef Type" required>
              <TextInput />
            </FormField>
            <FormField label="Reef Zone" required>
              <TextInput />
            </FormField>
          </Box>
          <hr />
          <Box margin="small">
            <FormField label="Notes" required>
              <TextInput />
            </FormField>
          </Box>
        </Box>
      </Form>
    </Box>
  )
}

export default SiteForm

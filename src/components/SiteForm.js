import React from 'react'
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
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import Breadcrumbs from './Breadcrumbs'

function SiteForm() {
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
        <Box pad={{ vertical: 'small' }} align="center" justify="center">
          <Button label="Save" color="status-ok" primary />
        </Box>
      </Box>
      <Box
        margin="small"
        // border={{ size: 'xsmall', color: 'dark-3', side: 'veritcal' }}
        width="fill"
        height="large"
        direction="column"
        overflow={{ vertical: 'scroll' }}
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
              <Box
                direction="column"
                margin="medium"
                width="medium"
                pad={{ horizontal: 'medium' }}
              >
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
              <Box width="fill" height="fill">
                <MapContainer
                  center={[0, 0]}
                  zoom={13}
                  scrollWheelZoom={false}
                  style={{ width: '800px', height: '400px' }}
                >
                  <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {/* <Marker position={[0, 0]}></Marker> */}
                </MapContainer>
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
            {/* <hr /> */}
            <Box margin="small">
              <FormField label="Notes" required>
                <TextArea id="text-area" placeholder="placeholder" />
              </FormField>
            </Box>
          </Box>
        </Form>
      </Box>
    </>
  )
}

export default SiteForm

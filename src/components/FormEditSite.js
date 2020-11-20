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
import L, { icon as leafetIcon } from 'leaflet'
import { Redirect } from 'react-router-dom'

import MapContent from './MapContent'

import { countries, reverseCountries } from '../lib/countries'
import { reefTypes, reverseReefTypes } from '../lib/reefTypes'
import { reefZones, reverseReefZones } from '../lib/reefZones'
import { reefExposures, reverseReefExposures } from '../lib/reefExposures'
import { updateRecordFields } from '../lib/api'
import { submitRecordToPostgres } from '../services/postgresApi'

let DefaultIcon = leafetIcon({
  iconUrl: icon,
  shadowUrl: iconShadow,
})

L.Marker.prototype.options.icon = DefaultIcon

const FormEditSite = ({ siteContent, setFormElement }) => {
  const { currentValues, originalRecord } = siteContent
  const [redirect, setRedirect] = useState(false)

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
                <TextInput
                  value={currentValues.name}
                  onChange={(e) =>
                    setFormElement({ element: 'name', value: e.target.value })
                  }
                  onBlur={() => {
                    updateRecordFields({
                      originalRecord,
                      fields: { name: currentValues.name },
                    })
                  }}
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
                <FormField label="Country" required>
                  <Select
                    options={Object.keys(countries)}
                    value={reverseCountries[currentValues.country]}
                    onChange={({ option }) => {
                      setFormElement({
                        element: 'country',
                        value: countries[option],
                      })
                      setTimeout(
                        updateRecordFields({
                          originalRecord,
                          fields: {
                            country: countries[option],
                          },
                        }),
                        50,
                      )
                    }}
                  />
                </FormField>

                <FormField label="Latitude" required>
                  <TextInput
                    value={siteContent.currentValues.latitude}
                    type="number"
                    disabled
                  />
                </FormField>
                <Text size="small" color="dark-4">
                  Decimal Degrees
                </Text>
                <br />
                <FormField label="Longitude" required>
                  <TextInput
                    value={siteContent.currentValues.longitude}
                    type="number"
                    disabled
                  />
                </FormField>
                <Text size="small" color="dark-4">
                  Decimal Degrees
                </Text>
                <br />
              </Box>
              <Box width="fill" height="fill">
                <MapContainer
                  center={[currentValues.latitude, currentValues.longitude]}
                  zoom={4}
                  scrollWheelZoom
                  style={{ width: '800px', height: '400px' }}
                >
                  <MapContent
                    markerPosition={[
                      currentValues.latitude,
                      currentValues.longitude,
                    ]}
                    setMarkerPosition={([latitude, longitude]) => {
                      // setFormElement({
                      //   element: 'latitude',
                      //   value: Number(latitude),
                      // })
                      // setFormElement({
                      //   element: 'longitude',
                      //   value: Number(longitude),
                      // })
                      updateRecordFields({
                        originalRecord,
                        fields: {
                          latitude: Number(latitude),
                          longitude: Number(longitude),
                        },
                      })
                    }}
                  />
                </MapContainer>
              </Box>
            </Box>
            <Box margin="small">
              <FormField label="Exposure" required>
                <Select
                  options={Object.keys(reefExposures)}
                  value={reverseReefExposures[currentValues.exposure]}
                  onChange={({ option }) => {
                    setFormElement({
                      element: 'exposure',
                      value: reefExposures[option],
                    })
                    setTimeout(
                      () =>
                        updateRecordFields({
                          originalRecord,
                          fields: { exposure: reefExposures[option] },
                        }),
                      50,
                    )
                  }}
                />
              </FormField>
              <FormField label="Reef Type" required>
                <Select
                  options={Object.keys(reefTypes)}
                  value={reverseReefTypes[currentValues.reefType]}
                  onChange={({ option }) => {
                    setFormElement({
                      element: 'reefType',
                      value: reefTypes[option],
                    })
                    setTimeout(
                      () =>
                        updateRecordFields({
                          originalRecord,
                          fields: { reefType: reefTypes[option] },
                        }),
                      50,
                    )
                  }}
                />
              </FormField>
              <FormField label="Reef Zone" required>
                <Select
                  options={Object.keys(reefZones)}
                  value={reverseReefZones[currentValues.reefZone]}
                  onChange={({ option }) => {
                    setFormElement({
                      element: 'reefZone',
                      value: reefZones[option],
                    })
                    setTimeout(
                      () =>
                        updateRecordFields({
                          fields: { reefZone: reefZones[option] },
                          originalRecord,
                        }),
                      50,
                    )
                  }}
                />
              </FormField>
            </Box>
            <hr />
            <Box margin="small">
              <FormField label="Notes">
                <TextArea
                  id="text-area"
                  placeholder="placeholder"
                  value={currentValues.notes}
                  onChange={(e) =>
                    setFormElement({ element: 'notes', value: e.target.value })
                  }
                  onBlur={() =>
                    setTimeout(
                      () =>
                        updateRecordFields({
                          fields: { notes: currentValues.notes },
                          originalRecord,
                        }),
                      50,
                    )
                  }
                />
              </FormField>
            </Box>
            <Box direction="row" align="start">
              <Box pad={{ vertical: 'small' }} width="small" margin="small">
                <Button
                  label="Finish Session"
                  color="status-ok"
                  secondary
                  onClick={() => setRedirect(true)}
                />
              </Box>
              { process.env.REACT_APP_API_MODE === 'POUCHDB'}
              <Box pad={{ vertical: 'small' }} width="small" margin="small">
                <Button
                  label="Submit"
                  secondary
                  onClick={() => submitRecordToPostgres(currentValues)}
                />
              </Box>
            </Box>
          </Box>
        </Form>
      </Box>
    </>
  )
}

export default FormEditSite

import React, { useEffect, useReducer, useState } from 'react'
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
import { DataStore } from '@aws-amplify/datastore'
import { MapContainer } from 'react-leaflet'
import L, { icon as leafetIcon } from 'leaflet'
import { Redirect } from 'react-router-dom'

import MapContent from './MapContent'

import { countries, reverseCountries } from '../lib/countries'
import { reefTypes, reverseReefTypes } from '../lib/reefTypes'
import { reefZones, reverseReefZones } from '../lib/reefZones'
import { reefExposures, reverseReefExposures } from '../lib/reefExposures'

import { Site } from '../models'

let DefaultIcon = leafetIcon({
  iconUrl: icon,
  shadowUrl: iconShadow,
})

L.Marker.prototype.options.icon = DefaultIcon

const initialState = {}

function reducer(state, action) {
  switch (action.type) {
    case 'set-form':
      return form
    case 'reset-form':
      return initialState
    case 'update-form':
      return { ...state, [action.element]: action.value }
    default:
      throw new Error()
  }
}

const EditSiteForm = ({ record }) => {
  const [markerPosition, setMarkerPosition] = useState([-12.477, 160.307])
  const [name, setName] = useState(null)
  const [country, setCountry] = useState(null)
  const [exposure, setExposure] = useState(null)
  const [reefType, setReefType] = useState(null)
  const [reefZone, setReefZone] = useState(null)
  const [notes, setNotes] = useState(null)
  const [originalRecord, setOriginalRecord] = useState({})

  const [formContent, dispatch] = useReducer(reducer, initialState)
  const setForm = (form) => dispatch({ type: 'set-form', form })
  const updateForm = ({ element, value }) =>
    dispatch({ type: 'update-form', element, value })

  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    fetchSite(record).then((res) => {
      const {
        country,
        exposure,
        latitude,
        longitude,
        name,
        notes,
        reefType,
        reefZone,
      } = res

      setCountry(reverseCountries[country])
      setName(name)
      setExposure(reverseReefExposures[exposure])
      setReefType(reverseReefTypes[reefType])
      setReefZone(reverseReefZones[reefZone])
      setNotes(notes)
      setOriginalRecord(res)
      setMarkerPosition([latitude, longitude])
    })
  }, [])

  if (redirect) return <Redirect to="/" />

  async function fetchSite(record) {
    const site = await DataStore.query(Site, record)
    return site
  }

  // ! This is where can carry out actions based on the data in the form.
  function submitData() {
    DataStore.save(
      Site.copyOf(originalRecord, (updated) => {
        updated.exposure = reefExposures[exposure]
        updated.reefType = reefTypes[reefType]
        updated.reefZone = reefZones[reefZone]
        updated.country = countries[country]
        updated.notes = notes
        updated.name = name
        updated.latitude = Number(markerPosition[0])
        updated.longitude = Number(markerPosition[1])
      }),
    )
      .then((response) => {
        console.log('It worked ', response)
      })
      .catch((e) => {
        console.warn('oh noooo 👨‍🚒 ', e)
      })
  }

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
              width="xxlarge"
              background="light-4"
              border={{ size: 'xsmall', color: 'dark-3', side: 'bottom' }}
            />
            <Box margin="small">
              <FormField label="Name" name="name" required>
                <TextInput
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                    value={country}
                    onChange={({ option }) => setCountry(option)}
                  />
                </FormField>

                <FormField label="Latitude" name="latitude" required>
                  <TextInput
                    value={markerPosition[0]}
                    name="latitude"
                    type="number"
                    onChange={(e) =>
                      setMarkerPosition([e.target.value, markerPosition[1]])
                    }
                  />
                </FormField>
                <Text size="small" color="dark-4">
                  Decimal Degrees
                </Text>
                <br />
                <FormField label="Longitude" name="longitude" required>
                  <TextInput
                    value={markerPosition[1]}
                    name="longitude"
                    type="number"
                    onChange={(e) =>
                      setMarkerPosition([markerPosition[0], e.target.value])
                    }
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
                <Select
                  options={Object.keys(reefExposures)}
                  name="exposure"
                  value={exposure}
                  onChange={({ option }) => setExposure(option)}
                />
              </FormField>
              <FormField label="Reef Type" name="reefType" required>
                <Select
                  options={Object.keys(reefTypes)}
                  name="reefType"
                  value={reefType}
                  onChange={({ option }) => setReefType(option)}
                />
              </FormField>
              <FormField label="Reef Zone" name="reefZone" required>
                <Select
                  options={Object.keys(reefZones)}
                  name="reefZone"
                  value={reefZone}
                  onChange={({ option }) => setReefZone(option)}
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
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </FormField>
            </Box>
            <Box pad={{ vertical: 'small' }} width="small" margin="small">
              <Button
                label="Finish Session"
                color="status-ok"
                secondary
                onClick={() => setRedirect(true)}
              />
            </Box>
          </Box>
        </Form>
      </Box>
    </>
  )
}

export default EditSiteForm

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

const initialState = {
  originalRecord: {},
  currentValues: {
    exposure: null,
    reefType: null,
    reefZone: null,
    country: null,
    notes: null,
    name: null,
    latitude: null,
    longitude: null,
  },
  loading: true,
  error: null,
}

function reducer(state, action) {
  switch (action.type) {
    case 'reset-form':
      return initialState
    case 'set-form':
      return {
        originalRecord: action.form,
        currentValues: action.form,
        loading: false,
      }
    case 'update-form':
      return {
        ...state,
        currentValues: {
          ...state.currentValues,
          [action.element]: action.value,
        },
      }
    case 'set-error':
      return { ...state, error: action.error }
    case 'set-loading':
      return { ...state, loading: action.status }
    default:
      throw new Error()
  }
}

const FormEditSite = ({ record }) => {
  const [siteContent, dispatch] = useReducer(reducer, initialState)
  const { loading, error, currentValues, originalRecord } = siteContent
  const setLoading = (status) => dispatch({ type: 'set-loading', status })
  const setForm = (form) => dispatch({ type: 'set-form', form })

  async function fetchSite(record) {
    console.log('Fetch site ', record)
    const site = await DataStore.query(Site, record).catch((e) => {
      throw Error(e)
    })
    return site
  }

  const setFormElement = ({ element, value }) =>
    dispatch({ type: 'update-form', element, value })

  const [redirect, setRedirect] = useState(false)

  // Fetch data on initial load
  useEffect(() => {
    fetchSite(record).then((res) => {
      setForm(res)
      setLoading(false)
    })
  }, [])

  // Make subscription for when site is changed in front of user's eyes
  useEffect(() => {
    const subscription = DataStore.observe(Site).subscribe(() => {
      DataStore.query(Site, record).then((record) => {
        console.log('Datastore subscription ', record)
        if (record) setForm(record)
      })
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  if (error) return <h1>error</h1>
  if (loading) return <h1>loading</h1>
  if (redirect) return <Redirect to="/" />

  // ! This is where can carry out actions based on the data in the form.
  function submitData() {
    DataStore.save(
      Site.copyOf(originalRecord, (updated) => {
        updated.exposure = currentValues.exposure
        updated.reefType = currentValues.reefType
        updated.reefZone = currentValues.reefZone
        updated.country = currentValues.country
        updated.notes = currentValues.notes
        updated.name = currentValues.name
        updated.latitude = currentValues.latitude
        updated.longitude = currentValues.longitude
      }),
    )
      .then((response) => {
        console.log('Response to datastore save ', response)
      })
      .catch((e) => {
        console.warn('oh noooo 👨‍🚒 ', e)
      })
  }

  function submitFields(fields) {
    DataStore.save(
      Site.copyOf(originalRecord, (updated) => {
        Object.keys(fields).forEach((field) => (updated[field] = fields[field]))
      }),
    )
  }

  function submitField({ key, value }) {
    DataStore.save(
      Site.copyOf(originalRecord, (updated) => {
        updated[key] = value
      }),
    )
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
                  onBlur={submitData}
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
                        submitField({
                          key: 'country',
                          value: countries[option],
                        }),
                        250,
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
                      submitFields({
                        latitude: Number(latitude),
                        longitude: Number(longitude),
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
                    submitData()
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
                    submitData()
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
                    submitData()
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
                  onBlur={submitData}
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

export default FormEditSite

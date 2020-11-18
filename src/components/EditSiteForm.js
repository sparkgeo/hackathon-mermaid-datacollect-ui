import React, { useEffect, useState } from 'react'
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

import MapContent from './MapContent'

import countries from '../lib/countries'
import { Site } from '../models'

let DefaultIcon = leafetIcon({
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

const reverseReefZones = {}
Object.entries(reefZones).forEach(([key, value]) => {
  reverseReefZones[value] = key
})

const reverseCountries = {}
Object.entries(countries).forEach(([key, value]) => {
  reverseCountries[value] = key
})

const reverseReefTypes = {}
Object.entries(reefTypes).forEach(([key, value]) => {
  reverseReefTypes[value] = key
})

const reverseReefExposures = {}
Object.entries(reefExposures).forEach(([key, value]) => {
  reverseReefExposures[value] = key
})

const EditForm = ({ record }) => {
  const [markerPosition, setMarkerPosition] = useState([-12.477, 160.307])
  const [name, setName] = useState(null)
  const [country, setCountry] = useState(null)
  const [exposure, setExposure] = useState(null)
  const [reefType, setReefType] = useState(null)
  const [reefZone, setReefZone] = useState(null)
  const [notes, setNotes] = useState(null)
  const [originalRecord, setOriginalRecord] = useState({})

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
              <Button label="Save" color="status-ok" type="submit" primary />
            </Box>
          </Box>
        </Form>
      </Box>
    </>
  )
}

export default EditForm

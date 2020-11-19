import React, { useEffect, useState } from 'react'
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import * as L from 'leaflet'
import {
  Button,
  FormField,
  Form,
  TextArea,
  TextInput,
  Select,
  Text,
} from 'grommet'

import { MapContainer } from 'react-leaflet'

import MapContent from './MapContent'

import countryIds from '../lib/countries'
import { Column, ColumnPadded, Row } from './commonUI'
import SiteList from './SiteList'
import { reefExposureIds, reefTypeIds, reefZoneIds } from '../helpers'

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
})

L.Marker.prototype.options.icon = DefaultIcon

function SiteForm({ siteService, sites }) {
  const [markerPosition, setMarkerPosition] = useState([-12.477, 160.307])
  const [similarSites, setSimilarSites] = useState([])
  const areSimilarSites = similarSites.length > 0

  // ! This is where can carry out actions based on the data in the form.
  function submitData({ value: formContent }) {
    formContent.reefType = reefTypeIds[formContent.reefType]
    formContent.exposure = reefExposureIds[formContent.exposure]
    formContent.reefZone = reefZoneIds[formContent.reefZone]
    formContent.country = countryIds[formContent.country]

    const newSite = {
      ...formContent,
      lat: markerPosition[0],
      lng: markerPosition[1],
    }
    siteService
      .newSite(newSite)
      .then((response) => console.log('success', response))
      .catch((err) => {
        console.log('error', err)
      })
  }

  useEffect(() => {
    siteService.getSimilarSites(markerPosition).then((sites) => {
      setSimilarSites(sites)
      console.log(sites)
    })
  }, [markerPosition, siteService, sites])

  return (
    <ColumnPadded>
      <Form onSubmit={submitData}>
        <Column>
          <h2>New Site</h2>

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
                similarSites={similarSites}
              />
            </MapContainer>
            {`Latitude: ${markerPosition[0]} Londitude: ${markerPosition[1]}`}
          </ColumnPadded>
          {areSimilarSites ? (
            <Row>
              <Column>
                <Text color="#F00">
                  There are similar sites for this location. Please review them
                  to make sure you arent duplicating a site.
                </Text>

                <Button
                  label="Ignore similar sites, I want to create a new site"
                  color="status-ok"
                  primary
                  onClick={() => setSimilarSites([])}
                />
                <h2>Similar sites</h2>
                <SiteList sites={similarSites} editable />
              </Column>
            </Row>
          ) : (
            <>
              <FormField label="Name" name="name" required>
                <TextInput name="name" />
              </FormField>
              <FormField label="Country" name="country" required>
                <Select options={Object.keys(countryIds)} name="country" />
              </FormField>
              <FormField label="Exposure" name="exposure" required>
                <Select
                  options={Object.keys(reefExposureIds)}
                  name="exposure"
                />
              </FormField>
              <FormField label="Reef Type" name="reefType" required>
                <Select options={Object.keys(reefTypeIds)} name="reefType" />
              </FormField>
              <FormField label="Reef Zone" name="reefZone" required>
                <Select options={Object.keys(reefZoneIds)} name="reefZone" />
              </FormField>

              <FormField label="Notes" name="notes">
                <TextArea
                  id="text-area"
                  placeholder="placeholder"
                  name="notes"
                />
              </FormField>

              <Button label="Save" color="status-ok" type="submit" primary />
            </>
          )}
        </Column>
      </Form>
    </ColumnPadded>
  )
}

export default SiteForm

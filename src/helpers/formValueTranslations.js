import countryIds from '../lib/countries'

const reefTypeIds = {
  atoll: '16a0a961-df6d-42a5-86b8-bc30f87bab42',
  barrier: '2b99cdf4-9566-4e60-8700-4ec3b9c7e322',
  fringing: '19534716-b138-49b1-bbd8-420df9243413',
  lagoon: 'dc3aa6d3-2795-42bb-9771-39fbcdd3029d',
  patch: '7085ee02-2a2e-4b42-b61e-18a78f1b8d03',
}

const reefExposureIds = {
  'very sheltered': 'baa54e1d-4263-4273-80f5-35812304b592',
  sheltered: '051c7545-eea8-48f6-bc82-3ef66bfdfe75',
  'semi-exposed': '85b26198-4e3b-459c-868c-4e0706828cce',
  exposed: '997c6cb3-c5e5-4df6-9cfa-5814a58a7b9e',
}

const reefZoneIds = {
  'back reef': '06ea17cd-5d1d-46ae-a654-64901e2a9f96',
  crest: '49c85161-99ee-4bc3-b6c4-09b5810da0a8',
  'fore reef': '0e5ac2d0-d1cc-4f04-a696-f6d3db2b9ca8',
  pinnacle: 'bc188a4f-76ae-4701-a021-26297efc9a92',
}

const reverseMapObject = (originalObject) => {
  const reducer = (accumulator, [key, value]) => {
    const reversedKeyValue = { [value]: key }
    return { ...accumulator, ...reversedKeyValue }
  }
  return Object.entries(originalObject).reduce(reducer, {})
}

const reefTypes = reverseMapObject(reefTypeIds)
const reefExposures = reverseMapObject(reefExposureIds)
const reefZones = reverseMapObject(reefZoneIds)
const countries = reverseMapObject(countryIds)

export {
  countries,
  reefExposureIds,
  reefExposures,
  reefTypeIds,
  reefTypes,
  reefZoneIds,
  reefZones,
}

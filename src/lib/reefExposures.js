export const reefExposures = {
  ['very sheltered']: 'baa54e1d-4263-4273-80f5-35812304b592',
  ['sheltered']: '051c7545-eea8-48f6-bc82-3ef66bfdfe75',
  ['semi-exposed']: '85b26198-4e3b-459c-868c-4e0706828cce',
  ['exposed']: '997c6cb3-c5e5-4df6-9cfa-5814a58a7b9e',
}

export const reverseReefExposures = {}
Object.entries(reefExposures).forEach(([key, value]) => {
  reverseReefExposures[value] = key
})

export default reefExposures

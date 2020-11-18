export const reefTypes = {
  atoll: '16a0a961-df6d-42a5-86b8-bc30f87bab42',
  barrier: '2b99cdf4-9566-4e60-8700-4ec3b9c7e322',
  fringing: '19534716-b138-49b1-bbd8-420df9243413',
  lagoon: 'dc3aa6d3-2795-42bb-9771-39fbcdd3029d',
  patch: '7085ee02-2a2e-4b42-b61e-18a78f1b8d03',
}

export const reverseReefTypes = {}
Object.entries(reefTypes).forEach(([key, value]) => {
  reverseReefTypes[value] = key
})

export default reefTypes

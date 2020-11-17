const convertToName = (id, choices) => {
  if (id !== '') return Object.keys(choices).find((key) => choices[key] === id)

  return ''
}

export default convertToName

import React from 'react'
import { Box, Text, FormField, Form, TextInput } from 'grommet'

function SiteForm() {
  return (
    <Box
      margin="medium"
      border={{ size: 'xsmall', color: 'dark-3' }}
      width="xxlarge"
      height="xxlarge"
      direction="column"
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
            <Box direction="column" margin="medium" width="medium">
              <FormField label="Country" required>
                <TextInput />
              </FormField>
              <FormField label="Latitude" required>
                <TextInput />
              </FormField>
              <FormField label="Longitude" required>
                <TextInput />
              </FormField>
            </Box>
            <Box>Map</Box>
          </Box>
        </Box>
      </Form>
    </Box>
  )
}

export default SiteForm

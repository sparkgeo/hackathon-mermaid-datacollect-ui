import React, { useState } from 'react'
import { name } from 'faker'
import { Box, TextInput } from 'grommet'
import useCurrentUser from '../hooks/useCurrentUser'

function InputUserName() {
  const [userName, setUserName] = useState(name.firstName)
  const { setUser } = useCurrentUser()
  setUser(userName)

  const updateUserName = () => setUser(userName)

  return (
    <Box height="fill" width="medium" direction="column" justify="center">
      <TextInput
        onChange={(e) => {
          setUserName(e.target.value)
        }}
        onBlur={updateUserName}
        value={userName}
      />
    </Box>
  )
}

InputUserName.propTypes = {}

export default InputUserName

import React from 'react'
import PropTypes from 'prop-types'
import { Layer, Box, Button, Text } from 'grommet'

function ModalConfirmation(props) {
  const { closeModal, question, executeAction } = props

  return (
    <Layer onClickOutside={closeModal} onEsc={closeModal}>
      <Box width="medium">
        <Box pad="medium">
          <Text>{question}</Text>
        </Box>
        <Box direction="row" width="fill" justify="around" pad="medium">
          <Button
            label="yes"
            onClick={() => {
              executeAction()
              closeModal()
            }}
            primary
          />
          <Button label="no" onClick={() => closeModal} />
        </Box>
      </Box>
    </Layer>
  )
}

ModalConfirmation.propTypes = {
  question: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  executeAction: PropTypes.func.isRequired,
}

export default ModalConfirmation

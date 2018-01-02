// @flow
import React from 'react'
import styled from 'react-emotion'
import {connect} from 'react-redux'
import {actions} from 'store'
import RModal from 'react-modal'
// import * as modalTemplates from './templates'

const modalTemplates = {}

const CloseBtn = styled.div`
  position: absolute;
  top: 12px;
  right: 20px;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
`

const customStyles = {
  overlay: {
    zIndex: 100,
    background: 'transparent',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 400,
    minHeight: 200,
    padding: 40,
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
  },
}

const Modal = ({currentModal, setCurrentModal}) => {
  if (
    !currentModal ||
    !currentModal.type ||
    !modalTemplates[currentModal.type]
  ) {
    return null
  }

  const Content = modalTemplates[currentModal.type]
  const {disabledClose} = currentModal.options || {}
  const closeModal = () => setCurrentModal(null)
  const onRequestClose = () => !disabledClose && closeModal()

  return (
    <RModal
      isOpen
      contentLabel="Modal"
      onRequestClose={onRequestClose}
      style={customStyles}
    >
      {!disabledClose && <CloseBtn onClick={closeModal}>X</CloseBtn>}
      <Content onClose={closeModal}/>
    </RModal>
  )
}

export default connect(({currentModal}) => ({currentModal}), {
  setCurrentModal: actions.setCurrentModal,
})(Modal)

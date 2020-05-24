import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import ReactModal from 'react-modal'
import { copyToClipboard, closeModal } from '../actions'
import styledSystem from '../styledSystem'
import ClipboardImg from './clipboardImg.svg'
import { wrapperSyles } from './wrapper'
import ModalCloseImg from './modal-close.svg'

const Row = styledSystem(
  styled.div({
    width: '100%',
    '&+&': {
      marginTop: 10
    }
  })
)

const Key = styledSystem(
  styled.b({
    fontWeight: 'bold',
    marginRight: 10
  })
)

const Button = styledSystem(
  styled.button({
    border: '1px solid #333',
    marginTop: 10,
    padding: 10,
    background: 'transparent',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'all 200ms ease-out',
    '&:hover': {
      color: '#00cb5c',
      borderColor: '#00cb5c'
    },
    '&:focus': {
      outline: 'none'
    }
  })
)

ReactModal.setAppElement(document.getElementById('root'))

const Inner = styledSystem(
  styled(ReactModal)({
    ...wrapperSyles,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    minHeight: '50vh',
    maxHeight: '100%',
    position: 'fixed',
    top: '50%',
    left: 0,
    right: 0,
    transform: 'translateY(-50%)',
    border: '2px solid #333',
    '&:focus': {
      outline: 'none'
    }
  })
)

const Content = styledSystem(
  styled.div({
    display: 'flex',
    flexGrow: 1,
    alignItems: 'flex-start'
  })
)

const Details = styledSystem(
  styled.div({
    flexBasis: '40%',
    paddingBottom: 20
  })
)

const BigImage = styledSystem(
  styled.div({
    flexBasis: '60%',
    justifySelf: 'flex-end',
    objectPosition: 'top right'
  })
)

const Modal = ({
  displayModal,
  modalInfo,
  closeModal: handleClose,
  copyToClipboard: handleCopy
}) => {
  if (!displayModal) return null

  ReactModal.defaultStyles.overlay.backgroundColor = 'rgba(255,255,255,0.9)'

  const {
    title,
    url,
    username,
    images: { original: image }
  } = modalInfo
  const [name] = title.split(' GIF')
  return (
    <Inner
      isOpen={displayModal}
      contentLabel="Modal"
      shouldCloseOnOverlayClick
      onRequestClose={handleClose}
      width={{ xs: 1, sm: 660, md: 880, lg: 1080, xl: 1460 }}
    >
      <Row textAlign="right" marginBottom={25}>
        <img style={{ cursor: 'pointer' }} src={ModalCloseImg} onClick={handleClose} alt="close" />
      </Row>
      <Content flexDirection={{ xs: 'column', sm: 'row' }}>
        <Details paddingRight={{ xs: 0, sm: 20 }}>
          <Row>
            <Key>Title:</Key>
            <span>{name}</span>
          </Row>
          <Row>
            <Key>Username:</Key>
            <span>{username}</span>
          </Row>
          <Button onClick={() => handleCopy(url)}>
            <Key fontWeight="normal">Click to copy link</Key>
            <img width={20} height={20} src={ClipboardImg} alt="" />
          </Button>
        </Details>
        <BigImage>
          <img width="100%" src={image.url} decoding="async" loading="lazy" alt={name} />
        </BigImage>
      </Content>
    </Inner>
  )
}

const mapStateToProps = ({ displayModal, modalInfo }) => ({ displayModal, modalInfo })

const mapDispatchToProps = {
  closeModal,
  copyToClipboard
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal)

Modal.propTypes = {
  displayModal: PropTypes.bool,
  modalInfo: PropTypes.oneOfType([PropTypes.object]),
  closeModal: PropTypes.func,
  copyToClipboard: PropTypes.func
}

Modal.defaultProps = {
  displayModal: false,
  modalInfo: {},
  closeModal: () => { },
  copyToClipboard: () => { }
}

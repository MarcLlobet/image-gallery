import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { openModal } from '../actions'
import styledSystem from '../styledSystem'

const Figcaption = styledSystem(
  styled.figcaption({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 1,
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    margin: 10,
    width: 'calc(100% - 20px)',
    height: 'calc(100% - 20px)',
    background: 'rgba(0,0,0,0.8)',
    opacity: 0,
    transition: 'opacity 200ms ease-out',
    color: 'white'
  })
)

const Figure = styledSystem(
  styled.figure({
    margin: 0,
    marginBottom: 10,
    display: 'block',
    position: 'relative',
    float: 'left',
    cursor: 'pointer',
    zIndex: 0,
    [`&:hover ${Figcaption}`]: {
      opacity: 1
    }
  })
)
const Picture = styledSystem(
  styled.picture({
    float: 'left'
  })
)

const Title = styledSystem(
  styled.span({
    textTransform: 'capitalize'
  })
)

const Img = styledSystem(styled.img``)
const Source = styledSystem(styled.source``)

const Image = props => {
  const {
    id,
    title,
    username = 'Anonymous',
    images: { fixed_width_still: image, downsized_still: fallback },
    openModal: handleClick
  } = props

  return (
    <Figure
      key={id}
      onClick={() => handleClick(props)}
      height={{ xs: 'auto', sm: `${image.height}px` }}
      width={{ xs: 1, sm: 'auto' }}
    >
      <Picture width={{ xs: 1, sm: 'auto' }}>
        <Source srcSet={image.url} />
        <Img width={{ xs: 1, sm: 'auto' }} src={fallback.url} alt={title} />
      </Picture>
      <Figcaption>
        <Title>{title.split(' GIF')[0]}</Title>
        {username && (
          <>
            <span>by</span>
            <Title>{username}</Title>
          </>
        )}
      </Figcaption>
    </Figure>
  )
}

const mapDispatchToProps = {
  openModal
}

export default connect(null, mapDispatchToProps)(Image)

Image.propTypes = {
  id: PropTypes.string,
  url: PropTypes.string,
  title: PropTypes.string,
  username: PropTypes.string,
  images: PropTypes.objectOf(PropTypes.object),
  openModal: PropTypes.func
}

Image.defaultProps = {
  id: '',
  url: '',
  title: '',
  username: '',
  images: {},
  openModal: () => { }
}

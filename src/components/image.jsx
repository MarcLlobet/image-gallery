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
    margin: 15,
    width: 'calc(100% - 30px)',
    height: 'calc(100% - 30px)',
    background: 'rgba(255, 255, 255, 0.8)',
    opacity: 0,
    transition: 'opacity 200ms ease-out',
    border: '2px solid #333'
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
    height: 'auto',
    [`&:hover ${Figcaption}`]: {
      opacity: 1
    }
  })
)

const Picture = styledSystem(
  styled.picture({
    float: 'left',
    width: '100%',
    height: '100%'
  })
)

const Title = styledSystem(
  styled.span({
    textTransform: 'capitalize'
  })
)

const Img = styledSystem(
  styled.img({
    float: 'left',
    width: '100%',
    height: '100%'
  })
)

const Image = props => {
  const {
    id,
    title,
    username = 'Anonymous',
    images: { fixed_width_small_still: small, fixed_width_still: image },
    openModal: handleClick
  } = props

  return (
    <Figure
      key={id}
      onClick={() => handleClick(props)}
      width={{
        xs: 1,
        sm: `calc((100% / 2) - 10px)`,
        md: `calc((100% / 3) - 10px)`,
        lg: `calc((100% / 4) - 10px)`,
        xl: `calc((100% / 5) - 10px)`
      }}
    >
      <Picture>
        <Img
          srcset={(`${image.url} 200w`, `${small.url} 100w`)}
          src={image.url}
          decoding="async"
          loading="lazy"
          alt={title}
        />
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
  title: PropTypes.string,
  username: PropTypes.string,
  images: PropTypes.objectOf(PropTypes.object),
  openModal: PropTypes.func
}

Image.defaultProps = {
  id: '',
  title: '',
  username: '',
  images: {},
  openModal: () => { }
}

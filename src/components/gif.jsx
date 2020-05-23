import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { copyToClipboard } from '../actions'
import styledSystem from '../styledSystem'
import ClipboardImg from './clipboard.svg'

const Figcaption = styledSystem(
  styled.figcaption({
    display: 'flex',
    alignItems: 'center',
    justifyItems: 'center',
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
    opacity: 0
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
const Img = styledSystem(styled.img``)
const Source = styledSystem(styled.source``)

const Gif = ({
  id,
  url,
  title,
  images: { fixed_width_still: image, fixed_width_small_still: small, downsized_still: fallback },
  copyToClipboard: toClipboard
}) => (
    <Figure
      key={id}
      onClick={() => toClipboard(url)}
      height={{ xs: 'auto', sm: `${image.height}px` }}
      width={{ xs: 1, sm: 'auto' }}
    >
      <Picture width={{ xs: 1, sm: 'auto' }}>
        <Source srcSet={`${image.url}`} />
        <Img width={{ xs: 1, sm: 'auto' }} src={fallback.url} alt={title} />
      </Picture>
      <Figcaption>
        <Img width={25} height={25} margin="auto" src={ClipboardImg} alt="Copy to clipboard" />
      </Figcaption>
    </Figure>
  )

const mapDispatchToProps = {
  copyToClipboard
}

export default connect(null, mapDispatchToProps)(Gif)

Gif.propTypes = {
  id: PropTypes.string,
  url: PropTypes.string,
  title: PropTypes.string,
  images: PropTypes.objectOf(PropTypes.object),
  copyToClipboard: PropTypes.func
}

Gif.defaultProps = {
  id: '',
  url: '',
  title: '',
  images: {},
  copyToClipboard: () => { }
}

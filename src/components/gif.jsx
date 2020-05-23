import React from 'react'
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
  images: { fixed_width_downsampled: downsampled, fixed_width: src, fixed_width_still: fallback },
  copyToClipboard
}) => (
    <Figure
      key={id}
      onClick={() => copyToClipboard(url)}
      height={{ xs: 'auto', sm: `${src.height}px` }}
      width={{ xs: 1, sm: 'auto' }}
    >
      <Picture width={{ xs: 1, sm: 'auto' }}>
        <Source srcSet={`${downsampled.url}, ${src.url} 2x`} />
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

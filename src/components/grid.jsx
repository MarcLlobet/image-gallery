import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Masonry from 'react-masonry-component'
import styled from 'styled-components'
import { getImages } from '../actions'
import Gif from './gif'
import Media from '../media'
import styledSystem from '../styledSystem'

const masonryOptions = {
  transitionDuration: 0,
  gutter: 10,
  fitWidth: true
}

class Grid extends React.Component {
  componentDidMount() {
    const { getImages: loadImages } = this.props
    loadImages()
  }

  render() {
    const { images } = this.props
    if (!images || !images.data) return null

    const Div = styledSystem(styled.div``)

    const childElements = images.data.map(image => <Gif key={image.id} {...image} />)

    return (
      <>
        <Media mobile>
          <Div width={1}>{childElements}</Div>
        </Media>
        <Media pc>
          <Masonry options={{ ...masonryOptions, columnWidth: 200 }}>{childElements}</Masonry>
        </Media>
      </>
    )
  }
}

const mapStateToProps = state => ({
  images: state.images
})

const mapDispatchToProps = {
  getImages
}

export default connect(mapStateToProps, mapDispatchToProps)(Grid)

Grid.propTypes = {
  images: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object),
    meta: PropTypes.object,
    pagination: PropTypes.object
  }),
  getImages: PropTypes.func.isRequired
}

Grid.defaultProps = {
  images: {}
}

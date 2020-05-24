import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Masonry from 'react-masonry-component'
import BottomScrollListener from 'react-bottom-scroll-listener'
import styled from 'styled-components'
import { getImages } from '../actions'
import Image from './image'
import Media from '../media'
import styledSystem from '../styledSystem'
import { defaultParams } from '../service'

const masonryOptions = {
  percentPosition: true,
  transitionDuration: 500,
  gutter: 10,
  isResizable: true,
  isAnimated: true
}

const Div = styledSystem(styled.div``)
const Gallery = styledSystem(styled(Masonry)`
  width: 100%;
`)

const isNumber = num => Number(num) === num

class Grid extends React.Component {
  constructor(props) {
    super(props)
    this.loadImages = this.loadImages.bind(this)
  }

  componentDidMount() {
    this.loadImages()
  }

  loadImages() {
    /* Get the current state */
    const {
      getImages: getImagesAction,
      pagination: { total_count: totalCount, offset: currentOffset } = {}
    } = this.props

    /* Get the default params */
    const { limit, offset: defaultOffset } = defaultParams

    /* Add offset plus limit */
    /* Use default offset if not defined */
    const increasedOffset = isNumber(currentOffset) ? currentOffset + limit : defaultOffset

    /* If offset plus limit is higher than the total, get the difference */
    const offset =
      increasedOffset + limit > totalCount ? totalCount - increasedOffset : increasedOffset

    const params = {
      limit,
      offset
    }

    getImagesAction(params)
  }

  render() {
    const { images } = this.props

    const childElements = images.map(image => <Image key={image.id} {...image} />)

    return (
      <BottomScrollListener onBottom={this.loadImages}>
        <Media mobile>
          <Div width={1}>{childElements}</Div>
        </Media>
        <Media pc>
          <Gallery options={{ ...masonryOptions }}>{childElements}</Gallery>
        </Media>
      </BottomScrollListener>
    )
  }
}

const mapStateToProps = state => ({
  images: state.images,
  pagination: state.pagination
})

const mapDispatchToProps = {
  getImages
}

export default connect(mapStateToProps, mapDispatchToProps)(Grid)

Grid.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
  getImages: PropTypes.func.isRequired,
  pagination: PropTypes.objectOf(PropTypes.number)
}

Grid.defaultProps = {
  images: [],
  pagination: {}
}

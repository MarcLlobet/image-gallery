import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Masonry from 'react-masonry-component'
import BottomScrollListener from 'react-bottom-scroll-listener'
import styled from 'styled-components'
import { getImages } from '../actions'
import Gif from './gif'
import Media from '../media'
import styledSystem from '../styledSystem'
import { defaultParams } from '../service'

const masonryOptions = {
  transitionDuration: 0,
  gutter: 10,
  fitWidth: true
}

const Div = styledSystem(styled.div``)

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
      pagination: { total_count: totalCount, offset, count } = {}
    } = this.props

    /* Increase limit if defined */
    /* Use default limit if not defined */
    const countLimit = isNumber(count) ? count + defaultParams.limit : defaultParams.limit

    /* Set offset to current count */
    /* Use default offset if not defined */
    const countoffset = isNumber(offset) ? count : defaultParams.offset

    /* If limit is higher than the total, get the difference */
    /* Otherwise use the default limit */
    const totalLimit = countoffset + countLimit > totalCount ? totalCount - countoffset : countLimit

    const params = {
      limit: totalLimit,
      offset: countoffset
    }

    getImagesAction(params)
  }

  render() {
    const { images } = this.props

    const childElements = images.map(image => <Gif key={image.id} {...image} />)

    return (
      <BottomScrollListener onBottom={this.loadImages}>
        <Media mobile>
          <Div width={1}>{childElements}</Div>
        </Media>
        <Media pc>
          <Masonry options={{ ...masonryOptions, columnWidth: 200 }}>{childElements}</Masonry>
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

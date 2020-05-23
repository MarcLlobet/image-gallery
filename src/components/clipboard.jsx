import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled, { keyframes, css } from 'styled-components'
import { system } from 'styled-system'
import styledSystem from '../styledSystem'

const showLink = keyframes`
  from: {
    transform: 'translateY(0)'
  },
  to: {
    transform: 'translateY(100%)'
  }
`

const Wrapper = styledSystem(
  styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  `
)

const Div = styledSystem(styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  transform: translateY(100%);
`)

const Text = styledSystem(
  styled.div`
    padding: 10px 20px 6px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    background: #8effc1;
    transition: transform 350ms ease-in;
    ${system({
    translateY: {
      property: 'transform',
      transform: value => `translateY(${value})`
    }
  })};
  `
)

const Link = styledSystem(
  styled.a`
    color: inherit;
    text-decoration: none;
  `
)

const Clipboard = ({ copiedLink, displayLink }) => {
  // ? {
  //   animationName: () =>
  //     css`
  //         ${showLink}
  //       `,
  //   animationDuration: 250,
  //   animationTimingFunction: 'ease-out'
  // }

  return (
    <Wrapper>
      <Div>
        <Text
          width={{ xs: 1, sm: 660, md: 880, lg: 1080, xl: 1460 }}
          translateY={displayLink ? '-100%' : 0}
        >
          <Link href={copiedLink}>Link copied in the clipboard</Link>
        </Text>
      </Div>
    </Wrapper>
  )
}

const mapStateToProps = state => ({
  copiedLink: state.copiedLink,
  displayLink: state.displayLink
})

export default connect(mapStateToProps, null)(Clipboard)

Clipboard.propTypes = {
  copiedLink: PropTypes.string,
  displayLink: PropTypes.bool
}

Clipboard.defaultProps = {
  copiedLink: '',
  displayLink: false
}

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import styledSystem from '../styledSystem'

export const wrapperSyles = {
  fontSize: { xs: 'large', sm: 'medium', md: 'small' },
  fontWeight: 'normal',
  width: '100%',
  maxWidth: 1580,
  padding: '30px 20px 100px 20px',
  margin: '0 auto'
}

export const StyledWrapper = styledSystem(styled.div(wrapperSyles))

const Wrapper = ({ children }) => <StyledWrapper>{children}</StyledWrapper>

export default Wrapper

Wrapper.propTypes = {
  children: PropTypes.node.isRequired
}

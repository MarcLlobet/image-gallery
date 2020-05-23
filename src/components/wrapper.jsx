import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import styledSystem from '../styledSystem'

const Div = styledSystem(styled.div``)

const Wrapper = ({ children }) => (
  <Div
    fontSize={{ xs: 'large', sm: 'medium', md: 'small' }}
    fontWeight="normal"
    width={{ xs: 1, sm: 660, md: 880, lg: 1080, xl: 1460 }}
    maxWidth={1580}
    padding="30px 20px 100px 20px"
    m="0 auto"
  >
    {children}
  </Div>
)

export default Wrapper

Wrapper.propTypes = {
  children: PropTypes.node.isRequired
}

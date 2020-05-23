import React from 'react'
import styled from 'styled-components'
import styledSystem from '../styledSystem'

const Div = styledSystem(styled.div``)
const Title = styledSystem(styled.h1``)

const Header = () => (
  <Div marginBottom={30}>
    <Title fontWeight="bold" fontSize={34} lineHeight={`${38}px`}>
      Image gallery
    </Title>
    <Div fontSize={20}>The definitive image gallery of all times</Div>
  </Div>
)

export default Header

import styled from 'styled-components'
import {
  compose,
  space,
  color,
  layout,
  typography,
  flexbox,
  border,
  background,
  position,
  grid,
  shadow,
  width,
  minWidth,
  height,
  minHeight,
  system
} from 'styled-system'

const styledSystem = tag => {
  return styled(tag)(
    compose(
      space,
      color,
      layout,
      typography,
      flexbox,
      border,
      background,
      position,
      grid,
      shadow,
      width,
      minWidth,
      height,
      minHeight,
      system
    )
  )
}

export default styledSystem

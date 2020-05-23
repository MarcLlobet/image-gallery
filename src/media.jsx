import React from 'react'
import PropTypes from 'prop-types'
import HiddenCss from '@material-ui/core/Hidden/HiddenCss'

const Media = props => {
  const { mobile, pc, ...restProps } = props

  switch (true) {
    case Boolean(mobile):
      return (
        <HiddenCss {...restProps} smUp>
          {props.children}
        </HiddenCss>
      )
    case Boolean(pc):
      return (
        <HiddenCss {...restProps} xsDown>
          {props.children}
        </HiddenCss>
      )
    default:
      return <>{props.children}</>
  }
}
export default Media

Media.propTypes = {
  mobile: PropTypes.bool,
  pc: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired
}

Media.defaultProps = {
  mobile: false,
  pc: false
}

import React, {Component} from 'react'
import {NavLink as NavLinkOrig} from 'react-router-dom'
import {compose, withState} from 'recompose'

class NavLink extends Component {
  isActive = (match, location) => {
    const isActive = match && match.path === location.pathname
    if (isActive !== this.props.isActive) {
      setTimeout(() => this.props.setActive(isActive), 0)
    }
    return isActive
  }

  render() {
    const {isActive, ...rest} = this.props
    return <NavLinkOrig isActive={this.isActive} replace={isActive} {...rest}/>
  }
}

const enhance = compose(withState('isActive', 'setActive', false))

export default enhance(NavLink)

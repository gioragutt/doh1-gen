import React from 'react'
import {withState} from 'recompose'
import {Affix} from 'antd'

const Affixed = (({affixed, setAffixed, offsetTop, children, component: Component, ...props}) => (
  <Affix {...{onChange: setAffixed, offsetTop}}>
    <Component {...{affixed: affixed ? true : undefined, ...props}}>{children}</Component>
  </Affix>
))

const enhance = withState('affixed', 'setAffixed', false)
export default enhance(Affixed)

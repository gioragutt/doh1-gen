import React from 'react'
import {withState} from 'recompose'
import {Affix} from 'antd'

const Affixed = (({affixed, setAffixed, children, component: Component}) => (
  <Affix onChange={setAffixed}>
    <Component {...{affixed}}>{children}</Component>
  </Affix>
))

const enhance = withState('affixed', 'setAffixed', false)
export default enhance(Affixed)

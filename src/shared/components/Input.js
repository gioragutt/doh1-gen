import React from 'react'
import {FormControl} from 'react-bootstrap'
import {onValueChange} from 'shared/utils/forms'

const Input = ({type = 'text', onChange = () => {}, ...props}) => (
  <FormControl
    {...{
      type,
      onChange: onValueChange(onChange),
      ...props,
    }}
  />
)

export default Input

import React from 'react'
import {FormControl} from 'react-bootstrap'
import {onValueChange} from 'shared/utils/forms'

const Dropdown = ({value, values, onChange}) => (
  <FormControl
    {...{
      onChange: onValueChange(onChange),
      componentClass: 'select',
      value,
    }}
  >
    {
      values.map(({value, label}) => (
        <option {...{key: value, value}}>{label}</option>
      ))
    }
  </FormControl>
)

export default Dropdown

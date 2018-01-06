import React from 'react'
import {Button as BsButton,InputGroup} from 'react-bootstrap'

const Button = props => (
  <InputGroup.Button>
    <BsButton {...props}/>
  </InputGroup.Button>
)

export default Button

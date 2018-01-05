import React from 'react'
import {Form, Col, Button, FormGroup, FormControl, ControlLabel, InputGroup} from 'react-bootstrap'
import {ATTENDENCE_VALUES} from 'shared/constants'

import {branch, withState, compose, renderComponent} from 'recompose'

import SoldierNameInput from './SoldierNameInput'

const Action = ({onClick, bsStyle, children}) => (
  <InputGroup.Button>
    <Button {...{onClick, bsStyle}}>
      {children}
    </Button>
  </InputGroup.Button>
)

const EditAttendence = ({name, attendence, onAttendenceChange, onDelete, setEditing}) => (
  <Form horizontal>
    <FormGroup controlId="formControlsSelect">
      <Col xs={9} sm={10}>
        <InputGroup>
          <FormControl
            onChange={e => onAttendenceChange(e.target.value)}
            componentClass="select"
            placeholder="select"
            value={attendence}
          >
            {ATTENDENCE_VALUES.map(value => (
              <option {...{value, key: value}}>{value}</option>
            ))}
          </FormControl>
          <Action bsStyle="info" onClick={() => setEditing(true)}>
            ערוך שם
          </Action>
          <Action bsStyle="danger" onClick={onDelete}>
            מחק
          </Action>
        </InputGroup>
      </Col>
      <Col componentClass={ControlLabel} xs={3} sm={2}>
        {name}
      </Col>
    </FormGroup>
  </Form>
)

const EditName = ({name: initialValue, onNameChange: onSubmit, setEditing}) => (
  <SoldierNameInput
    {...{
      initialValue,
      onSubmit,
      submitButtonText: 'שנה שם',
      cancelButtonText: 'בטל',
      onCancel: () => setEditing(false),
    }}
  />
)

const SoldierListItem = compose(
  withState('isEditing', 'setEditing', false),
  branch(
    ({isEditing}) => isEditing,
    renderComponent(EditName),
    renderComponent(EditAttendence)
  ),
)()

export default SoldierListItem

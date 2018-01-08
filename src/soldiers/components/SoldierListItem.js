import React from 'react'
import {Form, Col, FormGroup, ControlLabel, InputGroup} from 'react-bootstrap'
import {branch, withState, compose, renderComponent} from 'recompose'

import {ATTENDENCE_VALUES} from 'shared/constants'
import {Button, Dropdown} from 'shared/components'

import SoldierNameInput from './SoldierNameInput'

const AttendenceValues = ATTENDENCE_VALUES.map(v => ({label: v, value: v}))

const EditAttendence = ({name, attendence, onAttendenceChange, onDelete, setEditing}) => (
  <Form horizontal dir="rtl">
    <FormGroup controlId="formControlsSelect">
      <Col xs={9} sm={10}>
        <InputGroup>
          <Dropdown
            {...{value: attendence, values: AttendenceValues, onChange: onAttendenceChange}}
          />
          <Button bsStyle="info" onClick={() => setEditing(true)}>ערוך שם</Button>
          <Button bsStyle="danger" onClick={onDelete}>מחק</Button>
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

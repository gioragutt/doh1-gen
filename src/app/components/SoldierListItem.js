import React, {Component} from 'react'
import {Form, Col, Button, FormGroup, FormControl, ControlLabel, InputGroup} from 'react-bootstrap'
import {ATTENDENCE_VALUES} from 'shared/constants'

import SoldierNameInput from './SoldierNameInput'

const Action = ({onClick, bsStyle, children}) => (
  <InputGroup.Button>
    <Button {...{onClick, bsStyle}}>
      {children}
    </Button>
  </InputGroup.Button>
)

export default class SoldierListItem extends Component {
  state = {
    isEditing: false,
  }

  _onNameChange(name) {
    this.props.onNameChange(name)
  }

  _setEditingMode(isEditing) {
    console.log('Setting edit to', isEditing)
    this.setState({isEditing})
  }

  startEditingName() {
    this._setEditingMode(true)
  }

  cancelNameChange() {
    this._setEditingMode(false)
  }

  submitNameChange(name) {
    this.cancelNameChange()
    this._onNameChange(name)
  }

  renderAttendenceSettings() {
    const {name, attendence, onAttendenceChange, onDelete} = this.props
    return (
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
              <Action bsStyle="info" onClick={() => this.startEditingName()}>
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
  }

  renderNameEdit() {
    const originalName = this.props.name
    return (
      <SoldierNameInput
        initialValue={originalName}
        onSubmit={name => this.submitNameChange(name)}
        submitButtonText={'שנה שם'}
        cancelButtonText={'בטל'}
        onCancel={() => this.cancelNameChange()}
      />
    )
  }

  render() {
    const {isEditing} = this.state
    return isEditing
      ? this.renderNameEdit()
      : this.renderAttendenceSettings()
  }
}

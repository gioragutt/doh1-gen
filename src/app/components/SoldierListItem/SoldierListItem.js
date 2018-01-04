import React, { Component } from 'react';
import { Form, Col, Button, FormGroup, FormControl, ControlLabel, InputGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';

import SoldierNameInput from '../SoldierNameInput/SoldierNameInput';
import './SoldierListItem.css';

export const ATTENDENCE_VALUES = [
  'ביחידה',
  'מחוץ ליחידה אחר',
  'מחוץ ליחידה בתפקיד',
  'חופש',
  'בהד1',
  'חו"ל',
  `יום ד'`,
  'מיוחדת',
  'חופשת מחלה',
  'מחלת בן/בת זוג',
  'מחלת ילד',
  'קורס/הכשרה',
];

export default class SoldierListItem extends Component {
  static propTypes = {
    attendence: PropTypes.string,
    name: PropTypes.string.isRequired,
    onAttendenceChange: PropTypes.func.isRequired,
    onNameChange: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
  
    this.state = {
      attendence: props.attendence || ATTENDENCE_VALUES[0],
      isEditing: false
    };
  }

  componentWillMount() {
    this._onAttendenceChange(this.state.attendence);
  }

  _onAttendenceChange(attendence) {
    this.props.onAttendenceChange(attendence);
  }

  handleAttendenceSelectionChanged(e) {
    const attendence = e.target.value;
    this.setState({attendence});
    this._onAttendenceChange(attendence);
  }

  _onNameChange(name) {
    this.props.onNameChange(name);
  }

  handleDelete() {
    this.props.onDelete();
  }

  _setEditingMode(isEditing) {
    console.log('Setting edit to', isEditing);
    this.setState({isEditing})
  }

  startEditingName() {
    this._setEditingMode(true);
  }

  cancelNameChange() {
    this._setEditingMode(false);
  }

  submitNameChange(name) {
    this.cancelNameChange();
    this._onNameChange(name);
  }

  renderAttendenceOptions(name) {
    return ATTENDENCE_VALUES.map((val, i) => (
      <option key={`${name}-attendence-${val}`} value={val}>{val}</option>
    ))
  }

  renderDeleteButton() {
    return (
      <InputGroup.Button>
        <Button
          bsStyle="danger"
          onClick={() => this.handleDelete()}
        >
          מחק
        </Button>
      </InputGroup.Button>
    );
  }

  renderEditButton() {
    return (
      <InputGroup.Button>
        <Button
          bsStyle="info"
          onClick={() => this.startEditingName()}
        >
          ערוך שם
        </Button>
      </InputGroup.Button>
    );
  }

  renderAttendenceSettings() {
    const { name } = this.props;
    return (
      <Form horizontal>
        <FormGroup controlId="formControlsSelect">
          <Col xs={9} sm={10}>
            <InputGroup>
              <FormControl
                onChange={(e) => this.handleAttendenceSelectionChanged(e)}
                componentClass="select"
                placeholder="select"
                value={this.state.attendence}
              >
                {this.renderAttendenceOptions(name)}
              </FormControl>
              {this.renderEditButton()}
              {this.renderDeleteButton()}
            </InputGroup>
          </Col>
          <Col componentClass={ControlLabel} xs={3} sm={2}>
            {name}
          </Col>
        </FormGroup>
      </Form>
    );
  }

  renderNameEdit() {
    const originalName = this.props.name;
    return (
      <SoldierNameInput
        initialValue={originalName}
        onSubmit={(name) => this.submitNameChange(name)}
        submitButtonText={'שנה שם'}
        cancelButtonText={'בטל'}
        onCancel={() => this.cancelNameChange()}
      />
    )
  }

  render() {
    const { isEditing } = this.state;
    return isEditing
      ? this.renderNameEdit()
      : this.renderAttendenceSettings();
  }
}
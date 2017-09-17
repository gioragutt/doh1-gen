import React, { Component } from 'react';
import { Form, Col, Button, FormGroup, FormControl, ControlLabel, InputGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';

import './SoldierListItem.css';

export const ATTENDENCE_VALUES = [
  'ביחידה',
  'מחוץ ליחידה אחר',
  'מחוץ ליחידה בתפקיד',
  'חופש',
  'בהד1',
  'חו"ל',
  'חופשת מחלה',
  `יום ד'`,
  'מחלת בן/בת זוג',
  'מחלת ילד',
  'קורס/הכשרה',
];

export default class SoldierListItem extends Component {
  static propTypes = {
    attendence: PropTypes.string,
    name: PropTypes.string.isRequired,
    onAttendenceChange: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
  
    this.state = {
      attendence: props.attendence || ATTENDENCE_VALUES[0]
    };
  }

  componentWillMount() {
    this._onAttendenceChange(this.state.attendence);
  }

  _onAttendenceChange(attendence) {
    this.props.onAttendenceChange(attendence);
  }

  handleSelection(e) {
    const attendence = e.target.value;
    this.setState({attendence});
    this._onAttendenceChange(attendence);
  }

  handleDelete() {
    this.props.onDelete();
  }

  renderAttendenceOptions(name) {
    return ATTENDENCE_VALUES.map((val, i) => (
      <option key={`${name}-attendence-${val}`} value={val}>{val}</option>
    ))
  }

  renderAttendenceSettings() {
    const { name } = this.props;
    return (
      <FormGroup controlId="formControlsSelect">
        <Col xs={9} sm={10}>
          <InputGroup>
            <FormControl onChange={(e) => this.handleSelection(e)} componentClass="select" placeholder="select" value={this.state.attendence}>
              {this.renderAttendenceOptions(name)}
            </FormControl>
            <InputGroup.Button>
              <Button onClick={() => this.handleDelete()}>X</Button>
            </InputGroup.Button>
          </InputGroup>
        </Col>
        <Col componentClass={ControlLabel} xs={3} sm={2}>
          {name}
        </Col>
      </FormGroup>
    )
  }

  render() {
    return (
      <Form horizontal>
        {this.renderAttendenceSettings()}
      </Form>
    )
  }
}
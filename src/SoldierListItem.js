import React, { Component } from 'react';
import { Form, Col, Button, FormGroup, FormControl, ControlLabel, InputGroup } from 'react-bootstrap';

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
  
  constructor(props) {
    super(props);
  
    this.state = {
      attendence: props.attendence || ATTENDENCE_VALUES[0]
    };
  }

  componentWillMount() {
    this.onChange(this.state.attendence);
  }

  onChange(attendence) {
    if (this.props.onChange) {
      this.props.onChange(attendence);
    }
  }

  handleSelection(e) {
    const attendence = e.target.value;
    this.setState({attendence});
    this.onChange(attendence);
  }

  handleDelete() {
    if (this.props.onDelete) {
      this.props.onDelete();
    }
  }

  render() {
    const { name } = this.props;
    return (
      <Form horizontal>
        <FormGroup controlId="formControlsSelect">
          <Col xs={9} sm={10}>
            <InputGroup>
              {/*<InputGroup.Addon>{name}</InputGroup.Addon>*/}
              <FormControl onChange={(e) => this.handleSelection(e)} componentClass="select" placeholder="select" value={this.state.attendence}>
                {
                  ATTENDENCE_VALUES.map((val, i) => (
                    <option key={`${name}-attendence-${val}`} value={val}>{val}</option>
                  ))
                }
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
      </Form>
    )
  }
}
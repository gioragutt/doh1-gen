import React, { Component } from 'react';
import { Button, FormGroup, InputGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';
import './SoldierNameInput.css';

export default class SoldierNameInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
  }

  getValidationState() {
    const length = this.state.value.length;
    return length === 0 ? 'error' : 'success';
  }

  handleChange(e) {
    this.setState({ value: e.target.value.trim() });
  }

  handleClick() {
    const { value } = this.state;
    if (!!value) {
      this.props.onAdd(value);
      this.setState({value: ''})
    }
  }

  render() {
    return (
      <form>
        <FormGroup
          controlId="formBasicText"
          validationState={this.getValidationState()}
        >
          <InputGroup>
            <FormControl
              type="text"
              value={this.state.value}
              placeholder="שם החייל"
              onChange={(e) => this.handleChange(e)}
            />
            <InputGroup.Button>
              <Button onClick={() => this.handleClick()}>הוסף חייל</Button>
            </InputGroup.Button>
            <FormControl.Feedback />
          </InputGroup>
        </FormGroup>
      </form>
    );
  }
};

import React, { Component } from 'react';
import { Button, FormGroup, InputGroup, FormControl } from 'react-bootstrap';
import PropTypes from 'prop-types';

import './SoldierNameInput.css';

export default class SoldierNameInput extends Component {
  static propTypes = {
    onAdd: PropTypes.func.isRequired
  };
  
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
  }

  getValidationState() {
    return this.state.value.length === 0 ? 'error' : 'success';
  }

  handleChange(e) {
    const { value } = e.target; 
    this.setState({ value });
  }

  handleClick() {
    const { value } = this.state;
    if (!!value) {
      this.props.onAdd(value.trim());
      this.setState({ value: '' })
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

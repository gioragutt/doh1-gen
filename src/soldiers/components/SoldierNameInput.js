import React, {Component} from 'react'
import {Button, FormGroup, InputGroup, FormControl} from 'react-bootstrap'

const CancelButton = ({cancelButtonText, onCancel: onClick}) => (
  <InputGroup.Button>
    <Button {...{onClick}}>
      {cancelButtonText}
    </Button>
  </InputGroup.Button>
)


export default class SoldierNameInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: props.initialValue || '',
    }
  }

  _isInputValueValid() {
    return this.state.value.length > 0
  }

  getValidationState() {
    return this._isInputValueValid() ? 'success' : 'error'
  }

  handleChange(e) {
    const {value} = e.target
    this.setState({value})
  }

  handleClick() {
    this._validateInputAndRaiseAddEvent()
  }

  handleSubmit(e) {
    e.preventDefault()
    this._validateInputAndRaiseAddEvent()
  }

  _validateInputAndRaiseAddEvent() {
    const {value} = this.state
    if (value) {
      this.props.onSubmit(value.trim())
      this.setState({value: ''})
    }
  }

  renderSubmitButton() {
    const butttonStyle = this._isInputValueValid() ? 'primary' : 'default'
    return (
      <InputGroup.Button>
        <Button
          bsStyle={butttonStyle}
          onClick={() => this.handleClick()}
        >
          {this.props.submitButtonText}
        </Button>
      </InputGroup.Button>
    )
  }

  renderCancelButton() {
    if (!this.props.cancelButtonText) {
      return null
    }

    const {onCancel, cancelButtonText} = this.props
    return (
      <CancelButton {...{onCancel, cancelButtonText}}/>
    )
  }

  render() {
    return (
      <form onSubmit={e => this.handleSubmit(e)}>
        <FormGroup
          controlId="formBasicText"
          validationState={this.getValidationState()}
        >
          <InputGroup>
            <FormControl
              type="text"
              value={this.state.value}
              placeholder="שם החייל"
              onChange={e => this.handleChange(e)}
            />
            {this.renderSubmitButton()}
            {this.renderCancelButton()}
            <FormControl.Feedback/>
          </InputGroup>
        </FormGroup>
      </form>
    )
  }
}

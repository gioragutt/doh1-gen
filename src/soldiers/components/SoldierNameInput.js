import React, {Component} from 'react'
import {FormGroup, InputGroup, FormControl} from 'react-bootstrap'
import {withState, branch, renderNothing} from 'recompose'
import {Button, Input} from 'shared/components'

const OptionalButton = branch(
  ({text}) => !text,
  renderNothing,
  ({text, onClick}) => (
    <Button {...{onClick}}>
      {text}
    </Button>
  )
)()

class SoldierNameInput extends Component {
  _isValid = () => this.props.value.trim().length > 0
  getValidationState = () => this._isValid() ? 'success' : 'error'
  
  submitIfValid = () => {
    const {value, setValue, onSubmit} = this.props
    if (this._isValid()) {
      onSubmit(value.trim())
      setValue('')
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    this.submitIfValid()
  }

  render() {
    const {setValue, onCancel, cancelButtonText, value, submitButtonText} = this.props
    return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup controlId="formBasicText" validationState={this.getValidationState()}>
          <InputGroup>
            <Input {...{placeholder: 'שם החייל', onChange: setValue, value}}/>
            <Button
              bsStyle={this._isValid() ? 'primary' : 'default'}
              onClick={this.submitIfValid}
            >
              {submitButtonText}
            </Button>
            <OptionalButton {...{onClick: onCancel, text: cancelButtonText}}/>
            <FormControl.Feedback/>
          </InputGroup>
        </FormGroup>
      </form>
    )
  }
}

const enhance = withState('value', 'setValue', ({initialValue}) => initialValue || '')

export default enhance(SoldierNameInput)

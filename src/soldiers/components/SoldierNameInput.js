import React from 'react'
import styled from 'react-emotion'
import {withState, branch, renderNothing, withHandlers, compose, mapProps} from 'recompose'
import {Form, Input, Button} from 'antd'

const StyledForm = styled(Form)`
  .has-feedback .ant-input {
    padding-right: 30px;
  }
`

const OptionalButton = branch(
  ({text}) => !text,
  renderNothing,
  ({text, onClick}) => (
    <Form.Item>
      <Button type="primary" htmlType="submit" {...{onClick}}>
        {text}
      </Button>
    </Form.Item>
  )
)()

const SoldierNameInput = ({onChange, onCancel, cancelButtonText, value, submitButtonText, submit, isValid}) => (
  <StyledForm
    layout="inline"
    onSubmit={e => {
      e.preventDefault()
      submit()
    }}
  >
    <Form.Item hasFeedback {...{help: 'יש להכניס שם', validateStatus: isValid ? 'success' : 'error'}}>
      <Input {...{value, placeholder: 'שם החייל', onChange}}/>
    </Form.Item>
    <Form.Item>
      <Button type="primary" htmlType="submit">{submitButtonText}</Button>
    </Form.Item>
    <OptionalButton {...{onClick: onCancel, text: cancelButtonText}}/>
  </StyledForm>
)

const enhance = compose(
  withState('value', 'setValue', ({initialValue}) => initialValue || ''),
  mapProps(props => ({
    ...props,
    isValid: props.value.trim().length > 0,
    onChange: e => e.target ? props.setValue(e.target.value) : props.setValue(e),
  })),
  withHandlers({
    submit: ({isValid, onSubmit, value, onChange}) => () => {
      if (isValid) {
        onSubmit(value.trim())
        onChange('')
      }
    },
  }),
)

export default enhance(SoldierNameInput)

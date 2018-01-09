import React from 'react'
import styled from 'react-emotion'
import {withState, withHandlers, compose, mapProps} from 'recompose'
import {Form, Input, Button} from 'antd'

const StyledForm = styled(Form)`
  .has-feedback .ant-input {
    padding-right: 30px;
  }

  text-align: center;
`

const OptionalButton = ({icon, onClick, ...props}) => icon ? (
  <Button type="primary" htmlType="submit" shape="circle" {...{...props, onClick, icon}}/>
) : null

const NameInput = ({
  onCancel, cancelButtonIcon, submitButtonIcon,
  onChange, submit, value, isValid,
}) => (
  <StyledForm
    layout="inline"
    onSubmit={e => {
      e.preventDefault()
      submit()
    }}
  >
    <Form.Item hasFeedback {...{help: isValid || 'יש להכניס שם', validateStatus: isValid ? 'success' : 'error'}}>
      <Input {...{value, placeholder: 'שם החייל', onChange}}/>
    </Form.Item>
    <Form.Item>
      <Button.Group dir="ltr">
        <OptionalButton {...{onClick: onCancel, icon: cancelButtonIcon, type: 'danger'}}/>
        <Button shape="circle" type="primary" htmlType="submit" icon={submitButtonIcon} disabled={!isValid}/>
      </Button.Group>
    </Form.Item>
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

export default enhance(NameInput)

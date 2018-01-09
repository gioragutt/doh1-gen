/* eslint-disable */

import React from 'react'
import styled from 'react-emotion'
import {branch, withState, compose, renderComponent} from 'recompose'
import {Form, Select, Button, Icon, Popconfirm} from 'antd'
import {ATTENDENCE_VALUES} from 'shared/constants'
import SoldierNameInput from './SoldierNameInput'

const AttendenceValues = ATTENDENCE_VALUES.map(v => ({label: v, value: v}))

const FormItem = styled(Form.Item)`
  .ant-form-item-label {
    width: 100%;
    text-align: right !important;
    
    label {
      width: 100%;
  
      &:after {
        content: none;
      }
  
      .label-wrapper {
        width: 100%;
  
        span {
          line-height: 32px;
        }

        button {
          margin-right: 10px;
        }
      }
    }
  }
`

const Label = ({name, onDelete, setEditing}) => (
  <div className="label-wrapper">
    <span>{name}</span>
    <Button shape="circle" icon="edit" type="primary" onClick={() => setEditing(true)}/>
    <Popconfirm title="אתה בטוח שתרצה להמשיך?" onConfirm={onDelete} okText="המשך" okType="danger" cancelText="בטל">
      <Button shape="circle" icon="delete" type="danger"/>
    </Popconfirm>
  </div>
)

const EditAttendence = ({name, attendence, onAttendenceChange, onDelete, setEditing}) => (
  <Form layout="horizontal" dir="rtl">
    <FormItem label={<Label {...{name, onDelete, setEditing}}/>}>
      <Select size="large" onChange={onAttendenceChange} value={attendence}>
        {AttendenceValues.map(({value, label}) => (
          <Select.Option {...{key: value, value}}>{label}</Select.Option>
        ))}
      </Select>
    </FormItem>
  </Form>
)

const EditName = ({name: initialValue, onNameChange: onSubmit, setEditing}) => (
  <SoldierNameInput
    {...{
      initialValue,
      onSubmit,
      submitButtonIcon: 'edit',
      cancelButtonIcon: 'close',
      onCancel: () => setEditing(false),
    }}
  />
)

const SoldierListItem = compose(
  withState('isEditing', 'setEditing', false),
  branch(
    ({isEditing}) => isEditing,
    renderComponent(EditName),
    renderComponent(EditAttendence)
  ),
)()

export default SoldierListItem

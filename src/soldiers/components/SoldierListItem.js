/* eslint-disable */

import React from 'react'
import styled from 'react-emotion'
import {connect} from 'react-redux'
import {without} from 'lodash'
import {branch, withState, compose, renderComponent} from 'recompose'
import {Form, Select, Button, Icon, Popconfirm} from 'antd'
import {NameInput} from 'shared/components'
import {ATTENDENCE_VALUES} from 'shared/constants'

const FormItem = styled(Form.Item)`
  margin-bottom: 16px;
`

const LabelText = styled.span`
  line-height: 32px;
  font-weight: 700;
`

const LabelButton = styled(Button)`
  margin-right: 10px;
`

const LabelRoot = styled.div`
  width: 100%;
  padding: 0 0 8px;
`

const Label = ({name, onDelete, setEditing}) => (
  <LabelRoot>
    <LabelText>{name}</LabelText>
    <LabelButton shape="circle" icon="edit" type="primary" onClick={() => setEditing(true)}/>
    <Popconfirm title="אתה בטוח שתרצה להמשיך?" onConfirm={onDelete} okText="המשך" okType="danger" cancelText="בטל">
      <LabelButton shape="circle" icon="delete" type="danger"/>
    </Popconfirm>
  </LabelRoot>
)

const EditAttendence = ({name, attendence, onAttendenceChange, onDelete, setEditing, recentlyUsedAttendances}) => {
  const nonRecent = without(ATTENDENCE_VALUES, ...recentlyUsedAttendances)
  return (
    <Form layout="horizontal" dir="rtl">
      <FormItem>
        <Label {...{name, onDelete, setEditing}}/>
        <Select size="large" onChange={onAttendenceChange} value={attendence}>
          {recentlyUsedAttendances.length > 0 && (
            <Select.OptGroup label="אחרונים">
              {recentlyUsedAttendances.map(value => <Select.Option {...{key: value, value}}>{value}</Select.Option>)}
            </Select.OptGroup>
          )}
          <Select.OptGroup label="אחרים">
            {nonRecent.map(value => <Select.Option {...{key: value, value}}>{value}</Select.Option>)}
          </Select.OptGroup>
        </Select>
      </FormItem>
    </Form>
  )
}

const EditName = ({name: initialValue, onNameChange: onSubmit, setEditing}) => (
  <NameInput
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
  connect(({recentlyUsedAttendances}) => ({recentlyUsedAttendances})),
  withState('isEditing', 'setEditing', false),
  branch(
    ({isEditing}) => isEditing,
    renderComponent(EditName),
    renderComponent(EditAttendence)
  ),
)()

export default SoldierListItem

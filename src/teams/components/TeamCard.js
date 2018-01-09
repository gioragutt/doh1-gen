import React from 'react'
import styled from 'react-emotion'
import {compose, withState} from 'recompose'
import {connect} from 'react-redux'
import {Card, Button, Tag, Divider as ADivider, Popconfirm} from 'antd'
import {actions} from 'store'

import {NameInput} from 'shared/components'

const Divider = styled(ADivider)`
  margin: 16px 0;
`

const IconButton = styled(Button)`
  margin-right: 8px;
`

const TeamCardRoot = styled(Card)`
  text-align: right;
  margin-bottom: 16px;
`

const TeamNameTitle = styled.div`
  font-size: 16px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
  margin-bottom: 16px;
`

const Displayed = styled.div`
`

const DeleteTeamAction = ({onConfirm, name}) => (
  <Popconfirm
    placement="topLeft"
    title={`האם אתה בטוח שתרצה למחוק את ${name}?`}
    onConfirm={onConfirm}
    okText="המשך"
    okType="danger"
    cancelText="בטל"
  >
    <IconButton icon="delete" type="danger" shape="circle"/>
  </Popconfirm>
)

const TeamMembers = ({members}) => members.length > 0
  ? members.map(({name}) => name).map(name => <Tag key={name}>{name}</Tag>)
  : <div>לא הוזנו חיילים לצוות</div>

const TeamName = ({name, onConfirm, setEditing}) => (
  <TeamNameTitle dir="rtl">
    {name}
    <IconButton icon="edit" shape="circle" type="primary" onClick={() => setEditing(true)}/>
    <DeleteTeamAction {...{name, onConfirm}}/>
  </TeamNameTitle>
)

const TeamCard = ({teamId, name, displayed, members, deleteTeam, editing, setEditing, renameTeam}) => (
  <TeamCardRoot dir="rtl">
    {!editing ? <TeamName {...{name, setEditing, onConfirm: () => deleteTeam(teamId)}}/> : (
      <NameInput
        {...{
          initialValue: name,
          onCancel: () => setEditing(false),
          onSubmit: newName => {
            setEditing(false)
            renameTeam({teamId, name: newName})
          },
          cancelButtonIcon: 'close',
          submitButtonIcon: 'edit',
        }}
      />
    )}
    <Displayed>
      <span>{'הקבוצה '}</span>
      <b>{displayed ? 'מוצגת' : 'אינה מוצגת'}</b>
      <span>{' בדוח'}</span>
    </Displayed>
    <Divider/>
    <TeamMembers {...{members}}/>
  </TeamCardRoot>
)

const enhance = compose(
  withState('editing', 'setEditing', false),
  connect(null, {
    deleteTeam: actions.deleteTeam,
    renameTeam: actions.renameTeam,
  })
)

export default enhance(TeamCard)
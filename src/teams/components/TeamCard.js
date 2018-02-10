import React from 'react'
import styled from 'react-emotion'
import {compose, withState} from 'recompose'
import {connect} from 'react-redux'
import {Card, Button, Tag, Divider as ADivider, Popconfirm} from 'antd'
import {actions} from 'store'

import {NameInput, TeamDisplayed} from 'shared/components'

const Divider = styled(ADivider)`
  margin: 16px 0;
`

const TeamCardRoot = styled(Card)`
  margin-bottom: 16px !important;
`

const TeamNameTitle = styled.div`
  font-size: 16px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
  margin-bottom: 16px;
  
  & > * {
    margin-left: 8px !important;
  }
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
    <Button icon="delete" type="danger" shape="circle"/>
  </Popconfirm>
)

const TeamMembers = ({members}) => members.length > 0
  ? members.map(({name}) => name).map(name => <Tag key={name}>{name}</Tag>)
  : <div>לא הוזנו חיילים לצוות</div>

const TeamName = ({teamId, name, onConfirm, setEditing}) => (
  <TeamNameTitle dir="rtl">
    <span>{name}</span>
    <Button icon="edit" shape="circle" type="primary" onClick={() => setEditing(true)}/>
    <DeleteTeamAction {...{name, onConfirm}}/>
    <TeamDisplayed {...{teamId}}/>
  </TeamNameTitle>
)

const TeamCard = ({
  teamId, name, members,
  deleteTeam, editing, setEditing, renameTeam,
}) => (
  <TeamCardRoot dir="rtl">
    {!editing ? (
      <TeamName
        {...{
          name,
          setEditing,
          teamId,
          onConfirm: () => deleteTeam(teamId),
        }}
      />) : (
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
      />)
    }
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
import React from 'react'
import styled from 'react-emotion'
import {connect} from 'react-redux'
import {Divider, Switch} from 'antd'

import {actions} from 'store'
import {Affixed, NameInput} from 'shared/components'

import SoldierListItem from './SoldierListItem'
import AttendenceOutput from './AttendenceOutput'

const Root = styled.div`
  margin: auto;
  max-width: 660px;
`

const Title = styled.h1`
  text-align: center;
  background: ${({affixed}) => affixed ? '#f0f2f5' : 'none'};
  transition: all 0.5s ease;
  padding-bottom: ${({affixed}) => affixed ? '8px' : 'inherit'};

  .title {
    margin-left: 8px;
  }
`

const List = styled.ul`
  list-style-type: none;
  padding: 0;
`

const ListItemWrapper = styled.li`
  padding: 0;
`

const SoldiersPage = ({
  deleteSoldier,
  updateSoldier,
  addSoldier,
  team: {members, displayed, name},
  changeTeamDisplayed,
  teamId,
}) => (
  <Root dir="rtl">
    <Affixed component={Title}>
      <span className="title">{name}</span>
      <Switch
        checkedChildren="מוצג"
        unCheckedChildren="לא מוצג"
        checked={displayed}
        onChange={e => changeTeamDisplayed({teamId, displayed: e})}
      />
    </Affixed>
    <NameInput
      onSubmit={name => addSoldier({teamId, name})}
      submitButtonIcon="user-add"
    />
    <Divider style={{margin: '12px 0'}}/>
    <List>
      {members.map((member, index) => (
        <ListItemWrapper key={member.name}>
          <SoldierListItem
            {...member}
            onAttendenceChange={attendence => updateSoldier({teamId, index, attendence})}
            onDelete={() => deleteSoldier({teamId, index})}
            onNameChange={name => updateSoldier({teamId, index, name})}
          />
        </ListItemWrapper>
      ))}
    </List>
    <AttendenceOutput {...{soldiers: members}}/>
  </Root>
)

const enhance = connect(
  ({soldiers: {selectedTeam, teams}}) => ({
    team: teams[selectedTeam],
    teamId: selectedTeam,
  }),
  {
    deleteSoldier: actions.deleteSoldier,
    updateSoldier: actions.updateSoldier,
    addSoldier: actions.addSoldier,
    changeTeamDisplayed: actions.changeTeamDisplayed,
  }
)

export default enhance(SoldiersPage)
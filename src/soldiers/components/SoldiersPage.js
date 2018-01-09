import React from 'react'
import styled from 'react-emotion'
import {connect} from 'react-redux'

import {Divider, Switch} from 'antd'

import SoldierNameInput from './SoldierNameInput'
import SoldierListItem from './SoldierListItem'
import AttendenceOutput from './AttendenceOutput'

import {actions} from 'store'
import {Affixed} from 'shared/components'

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
  selectedTeam,
  deleteSoldier,
  updateSoldier,
  addSoldier,
  soldiers,
  changeTeamDisplayed,
  displayed,
}) => (
  <Root dir="rtl">
    <Affixed component={Title} offsetTop={64}>
      <span className="title">{selectedTeam}</span>
      <Switch
        checkedChildren="מוצג"
        unCheckedChildren="לא מוצג"
        checked={displayed}
        onChange={changeTeamDisplayed}
      />
    </Affixed>
    <SoldierNameInput
      onSubmit={name => addSoldier({name})}
      submitButtonIcon="user-add"
    />
    <Divider style={{margin: '12px 0'}}/>
    <List>
      {soldiers.map((soldier, index) => (
        <ListItemWrapper key={soldier.name}>
          <SoldierListItem
            {...soldier}
            onAttendenceChange={attendence => updateSoldier({index, attendence})}
            onDelete={() => deleteSoldier(index)}
            onNameChange={name => updateSoldier({index, name})}
          />
        </ListItemWrapper>
      ))}
    </List>
    <AttendenceOutput {...{soldiers}}/>
  </Root>
)

const enhance = connect(
  ({soldiers: {selectedTeam, teams}}) => ({
    soldiers: teams[selectedTeam].members,
    displayed: teams[selectedTeam].displayed,
    selectedTeam,
  }),
  {
    deleteSoldier: actions.deleteSoldier,
    updateSoldier: actions.updateSoldier,
    addSoldier: actions.addSoldier,
    changeTeamDisplayed: actions.changeTeamDisplayed,
  }
)

export default enhance(SoldiersPage)
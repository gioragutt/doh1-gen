import React from 'react'
import styled from 'react-emotion'
import {connect} from 'react-redux'
import {withState} from 'recompose'

import {Divider, Affix} from 'antd'

import SoldierNameInput from './SoldierNameInput'
import SoldierListItem from './SoldierListItem'
import AttendenceOutput from './AttendenceOutput'

import {actions} from 'store'

const Root = styled.div`
  margin: auto;
  max-width: 660px;
`

const Title = styled.h1`
  text-align: center;
  background: ${({affixed}) => affixed ? '#f0f2f5' : 'none'};
  transition: all 0.5s ease;
`

const List = styled.ul`
  list-style-type: none;
  padding: 0;
`

const ListItemWrapper = styled.li`
  padding: 0;
`

const AffixedTitle = withState('affixed', 'setAffixed', false)(({affixed, setAffixed, children}) => (
  <Affix onChange={setAffixed}>
    <Title {...{affixed}}>{children}</Title>
  </Affix>
))

const SoldiersPage = ({selectedTeam, deleteSoldier, updateSoldier, addSoldier, soldiers}) => (
  <Root dir="rtl">
    <AffixedTitle>{selectedTeam}</AffixedTitle>
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
  ({soldiers: {selectedTeam, teams}}) => ({soldiers: teams[selectedTeam], selectedTeam}),
  {
    deleteSoldier: actions.deleteSoldier,
    updateSoldier: actions.updateSoldier,
    addSoldier: actions.addSoldier,
  }
)

export default enhance(SoldiersPage)
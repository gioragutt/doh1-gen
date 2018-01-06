import React from 'react'
import styled from 'react-emotion'
import {connect} from 'react-redux'

import SoldierNameInput from './SoldierNameInput'
import SoldierListItem from './SoldierListItem'
import AttendenceOutput from './AttendenceOutput'
import Notifications from './Notifications'

import {actions} from 'store'

const Root = styled.div`
  margin: auto;
`

const Title = styled.h1`
  text-align: center;
`

const SoldiersList = styled.ul`
  list-style-type: none;
  padding: 0;
`

const SoldiersListItem = styled.li`
  padding: 0;
`

const SoldiersPage = ({deleteSoldier, updateSoldier, addSoldier, soldiers}) => (
  <Root dir="rtl">
    <Notifications/>
    <Title>מחולל דוח1</Title>
    <SoldierNameInput
      onSubmit={name => addSoldier({name})}
      submitButtonText={'הוסף חייל'}
    />
    <SoldiersList>
      {soldiers.map((soldier, index) => (
        <SoldiersListItem key={soldier.name}>
          <SoldierListItem
            {...soldier}
            onAttendenceChange={attendence => updateSoldier({index, attendence})}
            onDelete={() => deleteSoldier(index)}
            onNameChange={name => updateSoldier({index, name})}
          />
        </SoldiersListItem>
      ))}
    </SoldiersList>
    <AttendenceOutput {...{soldiers}}/>
  </Root>
)

const enhance = connect(
  ({soldiers}) => ({soldiers}),
  {
    deleteSoldier: actions.deleteSoldier,
    updateSoldier: actions.updateSoldier,
    addSoldier: actions.addSoldier,
  }
)

export default enhance(SoldiersPage)
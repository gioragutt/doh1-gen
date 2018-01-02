import React, {Component} from 'react'
import styled from 'react-emotion'
import {withProps} from 'recompose'

import SoldierNameInput from './SoldierNameInput'
import SoldierListItem from './SoldierListItem'
import AttendenceOutput from './AttendenceOutput'

import SoldierStorage from '../utils/storage'

const Root = withProps({dir: 'rtl'})(styled.div`
  max-width: 660px;
  margin: auto;
`)

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

export default class App extends Component {
  state = {
    soldiers: SoldierStorage.load(),
  }

  saveSoldiers(soldiers) {
    this.setState({soldiers})
    SoldierStorage.save(soldiers)
  }

  _soldierNameAlreadyExists(name) {
    return this.state.soldiers.filter(s => s.name === name).length > 0
  }

  addSoldier(name) {
    if (this._soldierNameAlreadyExists(name)) {
      return
    }

    const newSoldier = {name}
    this.saveSoldiers([...this.state.soldiers, newSoldier])
  }

  changeSoldier(i, change) {
    const soldiers = this.state.soldiers.map((soldier, index) => {
      if (i !== index) {
        return soldier
      }

      console.log(`Changing ${soldier.name} with ${JSON.stringify(change)}`)
      return {...soldier, ...change}
    })

    this.saveSoldiers(soldiers)
  }

  setSoldierAttendence(i, attendence) {
    this.changeSoldier(i, {attendence})
  }

  setSoldierName(i, name) {
    if (!this._soldierNameAlreadyExists(name)) {
      this.changeSoldier(i, {name})
    }
  }

  deleteSoldier(i) {
    console.log(`Deleting soldier at ${i}`)
    const soldiers = this.state.soldiers.slice()
    soldiers.splice(i, 1)
    this.saveSoldiers(soldiers)
  }
  
  render() {
    const {soldiers} = this.state
    return (
      <Root>
        <Title>מחולל דוח1</Title>
        <SoldierNameInput
          onSubmit={name => this.addSoldier(name)}
          submitButtonText={'הוסף חייל'}
        />
        <SoldiersList>
          {soldiers.map((soldier, i) => (
            <SoldiersListItem key={soldier.name}>
              <SoldierListItem
                {...soldier}
                onAttendenceChange={attendence => this.setSoldierAttendence(i, attendence)}
                onDelete={() => this.deleteSoldier(i)}
                onNameChange={name => this.setSoldierName(i, name)}
              />
            </SoldiersListItem>
          ))}
        </SoldiersList>
        <AttendenceOutput {...{soldiers}}/>
      </Root>
    )
  }
}


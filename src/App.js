import React, { Component } from 'react';
import './App.css';

import SoldierNameInput from './SoldierNameInput';
import SoldierListItem from './SoldierListItem';
import AttendenceOutput from './AttendenceOutput';

import SoldierStorage from './storage';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      soldiers: SoldierStorage.load()
    };
  }

  saveSoldiers(soldiers) {
    this.setState({soldiers});
    SoldierStorage.save(soldiers);
  }

  addSoldier(name) {
    if (this.state.soldiers.filter(s => s.name === name).length > 0) {
      return;
    }

    const newSoldier = {name};
    this.saveSoldiers([...this.state.soldiers, newSoldier]);
  }

  changeSoldier(i, change) {
    const soldiers = this.state.soldiers.map((soldier, index) => {
      if (i !== index) {
        return soldier;
      }

      console.log(`Changing ${soldier.name} with ${JSON.stringify(change)}`);
      return {...soldier, ...change};
    });

    this.saveSoldiers(soldiers);
  }

  setSoldierAttendence(i, attendence) {
    this.changeSoldier(i, {attendence});
  }

  deleteSoldier(i) {
    console.log(`Deleting soldier at ${i}`)
    const soldiers = this.state.soldiers.slice();
    soldiers.splice(i, 1);
    this.saveSoldiers(soldiers);
  }

  render() {
    return (
      <div className="app-container" dir="rtl">
        <h1 className="title">מחולל דוח1</h1>
        <SoldierNameInput onAdd={(name) => this.addSoldier(name)}/>
        <ul className="soldier-list">
        {
          this.state.soldiers.map((soldier, i) => (
           <li className="soldier-list-item">
             <SoldierListItem
              {...soldier}
              onChange={e => this.setSoldierAttendence(i, e)}
              onDelete={() => this.deleteSoldier(i)}
             />
           </li> 
          ))
        }
        </ul>
        <AttendenceOutput soldiers={this.state.soldiers} />
      </div>
    );
  }
}


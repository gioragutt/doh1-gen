import {composeReducers, makeReducer} from 'redux-toolbelt'
import {removeItem, updateItem, updateObjectProperties} from 'redux-toolbelt-immutable-helpers'

import {DEFAULT_ATTENDENCE} from 'shared/constants'
import {addItemByIdIfDoesntExist} from 'shared/utils/redux'

import {defaultSoldiersState} from './util'
import * as actions from './actions'

const addItem = (state, {name, attendence = DEFAULT_ATTENDENCE} = {}) =>
  addItemByIdIfDoesntExist(state, {name, attendence}, ({name}) => name)

const initialReducerState = defaultState => makeReducer(actions.init, state => state || defaultState)

const updateTeamWith = (state, updateFunc) => {
  const selectedTeam = state.teams[state.selectedTeam]
  const newTeam = updateFunc(selectedTeam)
  const teams = updateObjectProperties(state.teams, {[state.selectedTeam]: newTeam})
  return updateObjectProperties(state, {teams})
}

const makeTeamUpdateReducer = (actionCreator, updateFunc) =>
  makeReducer(actionCreator, (state, action) => updateTeamWith(state,
    team => updateObjectProperties(team, {members: updateFunc(team.members, action)})))

export const soldiers = composeReducers(
  initialReducerState(defaultSoldiersState()),
  makeReducer(actions.changeTeam, (state, {payload: selectedTeam}) => updateObjectProperties(state, {selectedTeam})),
  makeReducer(actions.changeTeamDisplayed, (state, {payload: displayed}) =>
    updateTeamWith(state, team => updateObjectProperties(team, {displayed}))),
  makeTeamUpdateReducer(actions.deleteSoldier, (state, {payload}) => removeItem(state, payload)),
  makeTeamUpdateReducer(actions.updateSoldier,(state, {payload: {index, ...update}}) =>
    updateItem(state, index, update)),
  makeTeamUpdateReducer(actions.addSoldier, (state, {payload}) => addItem(state, payload)),
)

export const uiProps = composeReducers(
  initialReducerState({}),
  makeReducer(actions.sidebarMenuClicked, (state, {payload: currentSidebarMenuItem}) =>
    updateObjectProperties(state, {currentSidebarMenuItem})),
)

import {composeReducers, makeReducer} from 'redux-toolbelt'
import {removeItem, updateItem, updateObjectProperties} from 'redux-toolbelt-immutable-helpers'

import {DEFAULT_ATTENDENCE} from 'shared/constants'
import {addItemByIdIfDoesntExist} from 'shared/utils/redux'

import {defaultSoldiersState} from './util'
import * as actions from './actions'

const addItem = (state, {name, attendence = DEFAULT_ATTENDENCE} = {}) =>
  addItemByIdIfDoesntExist(state, {name, attendence}, ({name}) => name)

const initialReducerState = defaultState => makeReducer(actions.init, state => state || defaultState)

const makeTeamUpdateReducer = (actionCreator, updateFunc) => makeReducer(actionCreator, (state, action) => {
  const {selectedTeam} = state
  const newTeamContent = updateFunc(state.teams[selectedTeam], action)
  const teams = {...state.teams, [selectedTeam]: newTeamContent}
  return updateObjectProperties(state, {teams})
})

export const soldiers = composeReducers(
  initialReducerState(defaultSoldiersState()),
  makeReducer(actions.changeTeam, (state, {payload: selectedTeam}) => updateObjectProperties(state, {selectedTeam})),
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

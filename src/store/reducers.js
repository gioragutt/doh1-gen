import {composeReducers, makeReducer} from 'redux-toolbelt'
import {removeItem, updateItem, updateObjectProperties} from 'redux-toolbelt-immutable-helpers'

import {DEFAULT_ATTENDENCE} from 'shared/constants'
import {addItemByIdIfDoesntExist} from 'shared/utils/redux'

import {defaultSoldiersState} from './util'
import * as actions from './actions'

const addItem = (state, {name, attendence = DEFAULT_ATTENDENCE} = {}) =>
  addItemByIdIfDoesntExist(state, {name, attendence}, ({name}) => name)

const initialReducerState = defaultState => makeReducer(actions.init, state => state || defaultState)

const teamsUpdate = (teams, teamId, newTeam) => {
    if (newTeam) {
      return updateObjectProperties(teams, {[teamId]: newTeam})
    }

    const newTeams = {...teams}
    delete newTeams[teamId]
    return newTeams
}

const updateTeamWith = (state, teamId, updateFunc) => {
  const selectedTeam = state.teams[teamId]
  const newTeam = updateFunc(selectedTeam)
  const teams = teamsUpdate(state.teams, teamId, newTeam)
  return updateObjectProperties(state, {teams})
}

const makeTeamUpdateReducer = (actionCreator, updateFunc) =>
  makeReducer(actionCreator, (state, action) =>
    updateTeamWith(state, action.payload.teamId, team => updateFunc(team, action)))

const makeTeamMembersUpdateReducer = (actionCreator, updateFunc) =>
  makeReducer(actionCreator, (state, action) => updateTeamWith(state, action.payload.teamId,
    team => updateObjectProperties(team, {members: updateFunc(team.members, action)})))

export const soldiers = composeReducers(
  initialReducerState(defaultSoldiersState()),
  
  makeTeamMembersUpdateReducer(actions.deleteSoldier, (state, {payload: {index}}) => removeItem(state, index)),
  makeTeamMembersUpdateReducer(actions.updateSoldier, (state, {payload: {index, ...update}}) =>
    updateItem(state, index, update)),
  makeTeamMembersUpdateReducer(actions.addSoldier, (state, {payload: {name}}) => addItem(state, {name})),

  makeReducer(actions.changeTeam, (state, {payload: selectedTeam}) => updateObjectProperties(state, {selectedTeam})),
  makeTeamUpdateReducer(actions.changeTeamDisplayed, (team, {payload: {displayed}}) =>
    updateObjectProperties(team, {displayed})),
  makeReducer(actions.deleteTeam, (state, {payload}) => updateTeamWith(state, payload, () => null)),
  makeTeamUpdateReducer(actions.renameTeam, (team, {payload: {name}}) => updateObjectProperties(team, {name})),
)

export const uiProps = composeReducers(
  initialReducerState({}),
  makeReducer(actions.sidebarMenuClicked, (state, {payload: currentSidebarMenuItem}) =>
    updateObjectProperties(state, {currentSidebarMenuItem})),
)

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
  makeReducer(actionCreator, (state, action) => updateTeamWith(state, action.payload.teamId,
    team => updateObjectProperties(team, {members: updateFunc(team.members, action)})))

export const soldiers = composeReducers(
  initialReducerState(defaultSoldiersState()),
  
  makeTeamUpdateReducer(actions.deleteSoldier, (state, {payload: {index}}) => removeItem(state, index)),
  makeTeamUpdateReducer(actions.updateSoldier, (state, {payload: {index, ...update}}) =>
    updateItem(state, index, update)),
  makeTeamUpdateReducer(actions.addSoldier, (state, {payload: {name}}) => addItem(state, {name})),

  makeReducer(actions.changeTeam, (state, {payload: selectedTeam}) => updateObjectProperties(state, {selectedTeam})),
  makeReducer(actions.changeTeamDisplayed, (state, {payload: {displayed, teamId}}) =>
    updateTeamWith(state, teamId, team => updateObjectProperties(team, {displayed}))),
  makeReducer(actions.deleteTeam, (state, {payload}) => updateTeamWith(state, payload, () => null)),
  makeReducer(actions.renameTeam, (state, {payload: {teamId, name}}) =>
    updateTeamWith(state, teamId, team => updateObjectProperties(team, {name}))),
)

export const uiProps = composeReducers(
  initialReducerState({}),
  makeReducer(actions.sidebarMenuClicked, (state, {payload: currentSidebarMenuItem}) =>
    updateObjectProperties(state, {currentSidebarMenuItem})),
)

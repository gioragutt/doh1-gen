import {composeReducers, makeReducer} from 'redux-toolbelt'
import {removeItem, updateItem, updateObjectProperties} from 'redux-toolbelt-immutable-helpers'
import {uniq} from 'lodash'

import {defaultSoldiersState, addItem, updateTeamWith, newTeam} from './util'
import * as actions from './actions'

const initialReducerState = defaultState => makeReducer(actions.init, state => state || defaultState)

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

  makeReducer(actions.addTeam, state => {
    const {id, team} = newTeam()
    return updateObjectProperties(state, {teams: {...state.teams, [id]: team}})
  }),
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

const updateRecentAttendences = (attendence, previous) =>
  uniq([attendence, ...previous]).slice(0, 5)

export const recentlyUsedAttendances = composeReducers(
  initialReducerState([]),
  makeReducer(
    actions.updateSoldier,
    (state, {payload: {attendence}}) => updateRecentAttendences(attendence, state),
  ),
)

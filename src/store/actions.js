import {makeActionCreator} from 'redux-toolbelt'

export const init = makeActionCreator('init')

const soldiersAction = makeActionCreator.withDefaults({prefix: 'SOLDIERS/'})

export const deleteSoldier = soldiersAction('delete')
export const updateSoldier = soldiersAction('update')
export const addSoldier = soldiersAction('add')

const teamsAction = makeActionCreator.withDefaults({prefix: 'TEAMS/'})

export const addTeam = teamsAction('addTeam')
export const changeTeam = teamsAction('changeTeam')
export const deleteTeam = teamsAction('deleteTeam')
export const renameTeam = teamsAction('renameTeam')
export const changeTeamDisplayed = teamsAction('changeTeamDisplayed')

const uiAction = makeActionCreator.withDefaults({prefix: 'UI/'})

export const sidebarMenuClicked = uiAction('sidebarMenuClicked')

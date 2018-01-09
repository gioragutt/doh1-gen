import {makeActionCreator} from 'redux-toolbelt'

export const init = makeActionCreator('init')

const soldiersAction = makeActionCreator.withDefaults({prefix: 'SOLDIERS/'})

export const deleteSoldier = soldiersAction('delete')
export const updateSoldier = soldiersAction('update')
export const addSoldier = soldiersAction('add')
export const changeTeam = soldiersAction('changeTeam')
export const changeTeamDisplayed = soldiersAction('changeTeamDisplayed')

const uiAction = makeActionCreator.withDefaults({prefix: 'UI/'})

export const sidebarMenuClicked = uiAction('sidebarMenuClicked')
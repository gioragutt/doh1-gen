import {makeActionCreator} from 'redux-toolbelt'

const soldiersAction = makeActionCreator.withDefaults({prefix: 'SOLDIERS/'})

export const init = makeActionCreator('init')

export const deleteSoldier = soldiersAction('delete')
export const updateSoldier = soldiersAction('update')
export const addSoldier = soldiersAction('add')
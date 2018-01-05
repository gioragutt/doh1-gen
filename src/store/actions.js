import {makeActionCreator} from 'redux-toolbelt'

const makeUpdatingActionCreator = makeActionCreator.withDefaults({
  defaultMeta: {saveToStorage: true},
})

export const init = makeActionCreator('init')
export const setSoldiers = makeActionCreator('setSoldiers')
export const deleteSoldier = makeUpdatingActionCreator('deleteSoldier')
export const updateSoldier = makeUpdatingActionCreator('updateSoldier')
export const addSoldier = makeUpdatingActionCreator('addSoldier')
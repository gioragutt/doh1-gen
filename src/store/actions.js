import {makeActionCreator} from 'redux-toolbelt'

export const init = makeActionCreator('init')
export const setSoldiers = makeActionCreator('setSoldiers')
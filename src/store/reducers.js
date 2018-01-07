import {composeReducers, makeReducer} from 'redux-toolbelt'
import * as actions from './actions'
import {DEFAULT_ATTENDENCE} from 'shared/constants'
import {removeItem, updateItem} from 'redux-toolbelt-immutable-helpers'
import {addItemByIdIfDoesntExist} from 'shared/utils/redux'

const addItem = (state, {name, attendence = DEFAULT_ATTENDENCE} = {}) =>
  addItemByIdIfDoesntExist(state, {name, attendence}, ({name}) => name)

export const soldiers = composeReducers(
  makeReducer(actions.init, state => state || []),
  makeReducer(actions.deleteSoldier, (state, {payload}) => removeItem(state, payload)),
  makeReducer(actions.updateSoldier,(state, {payload: {index, ...update}}) => updateItem(state, index, update)),
  makeReducer(actions.addSoldier, (state, {payload}) => addItem(state, payload)),
)

import {composeReducers, makeReducer} from 'redux-toolbelt'
import * as actions from './actions'
import {DEFAULT_ATTENDENCE} from 'shared/constants'
import {removeItem, updateItem, pushItems} from 'redux-toolbelt-immutable-helpers'

const nameId = ({name}) => name

const addItem = (state, {name, attendence = DEFAULT_ATTENDENCE} = {}) => {
  if (!name) {
    console.log('addItem called with', {name, attendence})
    return state
  }

  const hasSoldier = state.includes(item => nameId(item) === name)
  if (hasSoldier) {
    console.log('Already exists', {name})
    return state
  }

  return pushItems(state, {name, attendence})
}

export const soldiers = composeReducers(
  makeReducer(actions.setSoldiers),
  makeReducer(actions.deleteSoldier,
    (state, {payload}) => removeItem(state, payload)),
  makeReducer(actions.updateSoldier,
    (state, {payload: {index, ...update}}) => updateItem(state, index, update)),
  makeReducer(actions.addSoldier,
    (state, {payload}) => addItem(state, payload))
)

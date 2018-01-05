import {composeReducers, makeReducer} from 'redux-toolbelt'
import * as actions from './actions'

export const soldiers = composeReducers(
  makeReducer(actions.init),
  makeReducer(actions.setSoldiers)
)

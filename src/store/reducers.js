import {composeReducers, makeAsyncReducer, makeReducer} from 'redux-toolbelt'
import * as actions from './actions'

export const profile = composeReducers(
  makeAsyncReducer(actions.signup),
  makeAsyncReducer(actions.signin),
  makeAsyncReducer(actions.signout, {
    shouldDestroyData: false,
    shouldDestroyDataOnError: false,
  }),
)

export const currentModal = makeReducer(actions.setCurrentModal)

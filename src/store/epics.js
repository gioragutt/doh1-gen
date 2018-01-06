// import {makeAsyncEpic} from 'redux-toolbelt-observable'
// import {combineEpics} from 'redux-observable'
// import {push} from 'react-router-redux'
// import {Observable} from 'rxjs/Observable'
// eslint-disable-next-line import/no-unresolved
// import {empty} from 'rxjs/observable'
import {filter, take, switchMap} from 'rxjs/operator'
// import {api} from 'shared/services'
// import {
//   ACTION_ASYNC_FAILURE_SUFFIX,
//   ACTION_ASYNC_SUCCESS_SUFFIX,
// } from 'redux-toolbelt'
// import {error, success} from 'react-notification-system-redux'
import * as actions from './actions'
import SoldierStorage from 'shared/utils/storage'

export const init = $action =>
  $action
    .ofType(actions.init.TYPE)
    ::take(1)
    ::switchMap(() => {
      console.log('put init code here and issue actions')
      return [actions.setSoldiers(SoldierStorage.load())]
    })

export const saveSoldiersToStorage = ($action, {getState}) =>
  $action
    ::filter(({meta = {}}) => meta.saveToStorage)
    ::switchMap(() => {
      SoldierStorage.save(getState().soldiers)
      return []
    })

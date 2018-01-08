import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import {routerReducer as routing, routerMiddleware} from 'react-router-redux'
import {createEpicMiddleware, combineEpics} from 'redux-observable'
import {reducer as notifications} from 'react-notification-system-redux'

import {save, load} from 'shared/utils/storage'

import {defaultSoldiersState} from './util'
import * as epics from './epics'
import * as reducers from './reducers'

const rootReducer = combineReducers({
  ...reducers,
  routing,
  notifications,
})

const rootEpic = combineEpics(...Object.values(epics))

const persistedState = () => {
  const state = load()
  return Array.isArray(state) ? {soldiers: defaultSoldiersState(state)} : state
}

const saveStoreToStorage = store => () => {
  const state = store.getState()
  delete store.notifications
  delete store.uiProps
  save(state)
}

export default function configureStore(history, i18n, isProduction) {
  const composeEnhancers = isProduction ? compose : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const epicMiddleware = createEpicMiddleware(rootEpic, {dependencies: {i18n, history}})
  
  const store = createStore(
    rootReducer,
    persistedState(),
    composeEnhancers(applyMiddleware(routerMiddleware(history), epicMiddleware))
  )

  store.subscribe(saveStoreToStorage(store))
  return store
}

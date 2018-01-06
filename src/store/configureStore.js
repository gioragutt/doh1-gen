import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
// import {routerReducer as routing, routerMiddleware} from 'react-router-redux'
import {createEpicMiddleware, combineEpics} from 'redux-observable'
import {reducer as notifications} from 'react-notification-system-redux'

import {save, load} from 'shared/utils/storage'

import * as epics from './epics'
import * as reducers from './reducers'

const rootReducer = combineReducers({
  ...reducers,
  // routing,
  notifications,
})

const rootEpic = combineEpics(...Object.values(epics))

const persistedState = () => {
  const state = load()
  // load old version of state
  return Array.isArray(state) ? {soldiers: state} : state
}

export default function configureStore(i18n, isProduction) {
  const composeEnhancers = isProduction
    ? compose
    : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  
  const epicMiddleware = createEpicMiddleware(rootEpic, {
    dependencies: {i18n},
  })

  const store = createStore(
    rootReducer,
    persistedState(),
    composeEnhancers(applyMiddleware(epicMiddleware))
  )

  store.subscribe(() => save(store.getState()))

  return store
}

import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import {routerReducer as routing, routerMiddleware} from 'react-router-redux'
import {createEpicMiddleware, combineEpics} from 'redux-observable'
import {reducer as notifications} from 'react-notification-system-redux'
import * as epics from './epics'
import * as reducers from './reducers'

const rootReducer = combineReducers({
  ...reducers,
  routing,
  notifications,
})

const rootEpic = combineEpics(...Object.values(epics))

export default function configureStore(history, i18n, isProduction) {
  const composeEnhancers = isProduction
    ? compose
    : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const epicMiddleware = createEpicMiddleware(rootEpic, {
    dependencies: {i18n, history},
  })
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(routerMiddleware(history), epicMiddleware))
  )

  return store
}

import {makeAsyncEpic} from 'redux-toolbelt-observable'
import {push} from 'react-router-redux'
import {combineEpics} from 'redux-observable'
// import {Observable} from 'rxjs/Observable'
// eslint-disable-next-line import/no-unresolved
// import {empty} from 'rxjs/observable'
// eslint-disable-next-line import/no-unresolved
import {filter, take, switchMap, map, _do} from 'rxjs/operator'
import {api} from 'shared/services'
import {
  ACTION_ASYNC_FAILURE_SUFFIX,
  ACTION_ASYNC_SUCCESS_SUFFIX,
} from 'redux-toolbelt'
import {error, success} from 'react-notification-system-redux'
import * as actions from './actions'

export const trivialEpics = combineEpics(
  ...['signin', 'signup', 'signout'].map(name =>
    makeAsyncEpic(actions[name], api[name])
  )
)

export const init = $action =>
  $action
    .ofType(actions.init.TYPE)
    ::take(1)
    ::switchMap(() => {
      console.log('put init code here and issue actions')
      return []
    })

export const disconnectAfterSignout = $action =>
  $action.ofType(actions.signout.success.TYPE)::switchMap(() => {
    console.log('put final code here and issue actions')
    return []
  })

export const resetRecaptchaAfterSignupError = $action =>
  $action
    .ofType(actions.signup.failure.TYPE)
    ::_do(() => window.grecaptcha.reset())
    ::switchMap(() => [])

//
// Global notifications
//

export const globalErrorNotifications = $action =>
  $action
    ::filter(
      ({type, meta = {}}) =>
        type.endsWith(ACTION_ASYNC_FAILURE_SUFFIX) &&
        !meta.shouldIgnoreGlobalError
    )
    ::map(({payload, meta = {}}) => {
      const message = meta.errorMessage || payload.message || 'Unexpected error'
      return error({message})
    })

const actionsToShowSuccessNoifications = [].map(a => a.success.TYPE)

export const globalSuccessNotification = $action =>
  $action
    ::filter(({type}) => actionsToShowSuccessNoifications.includes(type))
    ::map(({type}, meta = {}) => {
      const base =
        meta.notificationBaseKey ||
        type.replace(ACTION_ASYNC_SUCCESS_SUFFIX, '')
      const spec = {
        title: `${base}SuccessTitle`,
        message: `${base}SuccessMessage`,
        ...meta.notification,
      }
      return success(spec)
    })

// prettier-ignore
export const redirectAccordingToMeta = $action =>
  $action
    ::filter((_, meta) => meta && meta.redirectTo)
    ::map((_, {redirectTo}) => push(redirectTo))

//
// modals
//

// const modalMappingToOpenAfterAction = {
//   [actions.forgotPassword.success.TYPE]: 'ForgotPasswordModal',
// }
//
// export const openModalAfterAction = $action =>
//   $action
//     ::filter(({type}) => modalMappingToOpenAfterAction[type])
//     ::map(({type}) =>
// actions.setCurrentModal({type: modalMappingToOpenAfterAction[type]}))

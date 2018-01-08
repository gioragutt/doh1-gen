import {push} from 'react-router-redux'
import {take, switchMap, filter, map} from 'rxjs/operator'
import * as actions from './actions'

export const init = $action =>
  $action
    .ofType(actions.init.TYPE)
    ::take(1)
    ::switchMap(() => {
      return []
    })

export const redirectAccordingToMeta = $action =>
  $action
    ::filter(({meta}) => meta && meta.redirectTo)
    ::map(({meta: {redirectTo}}) => push(redirectTo))

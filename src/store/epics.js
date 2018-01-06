import {take, switchMap} from 'rxjs/operator'
import * as actions from './actions'

export const init = $action =>
  $action
    .ofType(actions.init.TYPE)
    ::take(1)
    ::switchMap(() => {
      return []
    })

import {makeActionCreator, makeAsyncActionCreator} from 'redux-toolbelt'

export const init = makeActionCreator('init')

export const signin = makeAsyncActionCreator('signin')
export const signout = makeAsyncActionCreator('signout')
export const signup = makeAsyncActionCreator('signup')

export const setUiProps = makeActionCreator('setUiProps')
export const setCurrentModal = makeActionCreator('setCurrentModal')

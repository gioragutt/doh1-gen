import {pushItems, defaultIdSelector} from 'redux-toolbelt-immutable-helpers'

export const addItemByIdIfDoesntExist = (state, toAdd, idSelector = defaultIdSelector) => {
  if (!toAdd) {
    return state || []
  }

  toAdd = Array.isArray(toAdd) ? toAdd : [toAdd]

  if (!state) {
    return toAdd
  }

  const id = idSelector(toAdd)
  const exists = state.find(item => idSelector(item) === id)
  
  if (exists) {
    return state
  }

  return pushItems(state, toAdd)
}
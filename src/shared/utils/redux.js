import {pushItems, defaultIdSelector} from 'redux-toolbelt-immutable-helpers'

export const addItemByIdIfDoesntExist = (state, toAdd, idSelector = defaultIdSelector) => {
  if (!toAdd) {
    return state || []
  }

  toAdd = Array.isArray(toAdd) ? toAdd : [toAdd]

  if (!state) {
    return toAdd
  }

  toAdd = toAdd
    .map(item => [idSelector(item), item])
    .filter(([id]) => !state.find(item => idSelector(item) === id))
    .map(([_, item]) => item)

  if (toAdd.length === 0) {
    return state
  }

  return pushItems(state, toAdd)
}
import uuid from 'uuid'

import {updateObjectProperties} from 'redux-toolbelt-immutable-helpers'

import {DEFAULT_ATTENDENCE} from 'shared/constants'
import {addItemByIdIfDoesntExist} from 'shared/utils/redux'

export const addItem = (state, {name, attendence = DEFAULT_ATTENDENCE} = {}) =>
  addItemByIdIfDoesntExist(state, {name, attendence}, ({name}) => name)

const teamsUpdate = (teams, teamId, newTeam) => {
    if (newTeam) {
      return updateObjectProperties(teams, {[teamId]: newTeam})
    }

    const newTeams = {...teams}
    delete newTeams[teamId]
    return newTeams
}

export const updateTeamWith = (state, teamId, updateFunc) => {
  const selectedTeam = state.teams[teamId]
  const newTeam = updateFunc(selectedTeam)
  const teams = teamsUpdate(state.teams, teamId, newTeam)
  return updateObjectProperties(state, {teams})
}

export const newTeam = (members = []) => {
  const team = {
    name: 'צוות',
    displayed: true,
    members,
  }
  const id = uuid()
  return {id, team}
}

export const defaultSoldiersState = (members = []) => {
  const {id: selectedTeam, team} = newTeam(members)
  return {
    selectedTeam,
    teams: {
      [selectedTeam]: team,
    },
  }
}

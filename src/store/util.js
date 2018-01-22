import uuid from 'uuid'

export const defaultSoldiersState = (list = []) => {
  const selectedTeam = uuid()
  return {
    selectedTeam,
    teams: {
      [selectedTeam]: {
        name: 'צוות',
        displayed: true,
        members: list,
      },
    },
  }
}

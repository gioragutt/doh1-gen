export const DEFAULT_TEAM_NAME = 'צוות'

export const defaultSoldiersState = (list = []) => ({
  selectedTeam: DEFAULT_TEAM_NAME,
  teams: {
    [DEFAULT_TEAM_NAME]: list,
    test: [],
  },
})
import React from 'react'
import {compose} from 'recompose'
import {connect} from 'react-redux'

import TeamCard from './TeamCard'

const TeamsPage = ({teams, deleteTeam}) => (
  <div>
    {Object.keys(teams)
      .map(teamId => ({key: teamId, teamId, deleteTeam, ...teams[teamId]}))
      .map(props => <TeamCard {...props}/>)}
  </div>
)

const enhance = compose(
  connect(({soldiers: {teams}}) => ({teams}))
)

export default enhance(TeamsPage)
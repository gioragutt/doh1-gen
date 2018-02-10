import React from 'react'
import styled from 'react-emotion'
import {compose} from 'recompose'
import {connect} from 'react-redux'
import {Button} from 'antd'
import {actions} from 'store'

import TeamCard from './TeamCard'

const TeamPageRoot = styled.div`
  margin: auto;
  text-align: right;
  max-width: 660px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .new-team {
    margin-bottom: 16px;
  }
`

const TeamsPage = ({teams, deleteTeam, addTeam}) => (
  <TeamPageRoot>
    <Button className="new-team" size="large" icon="add" type="primary" onClick={addTeam}>New Team</Button>
    {Object.keys(teams)
      .map(teamId => ({key: teamId, teamId, deleteTeam, ...teams[teamId]}))
      .map(props => <TeamCard {...props}/>)}
  </TeamPageRoot>
)

const enhance = compose(
  connect(
    ({soldiers: {teams}}) => ({teams}),
    {addTeam: actions.addTeam}
  )
)

export default enhance(TeamsPage)
import React from 'react'
import {connect} from 'react-redux'
import {Switch} from 'antd'
import {compose, mapProps} from 'recompose'
import {actions} from 'store'

const TeamDisplayed = ({changeTeamDisplayed, displayed, teamId}) => (
  <Switch
    checkedChildren="מוצג"
    unCheckedChildren="לא מוצג"
    checked={displayed}
    onChange={e => console.log(e) || changeTeamDisplayed({teamId, displayed: e})}
  />
)

const enhance = compose(
  connect(({soldiers: {teams}}) => ({teams}), {changeTeamDisplayed: actions.changeTeamDisplayed}),
  mapProps(({teams, teamId, ...props}) => ({
    displayed: teams[teamId].displayed,
    teamId,
    ...props,
  }))
)

export default enhance(TeamDisplayed)
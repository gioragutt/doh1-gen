import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import SoldiersPage from 'soldiers'
import TeamsPage from 'teams'
import Shell from './Shell'
import Notifications from './Notifications'

const Settings = () => <h1>Settings</h1>
const NotFoundPage = () => <h1>NOT FOUND</h1>

const enhance = connect(({
  soldiers: {selectedTeam},
  routing: {location},
}) => ({selectedTeam, location}))

const StandardRoutes = enhance(({selectedTeam, location}) => (
  <Switch {...{location}}>
    <Route exact path="/" component={() => <Redirect to={`/teams/${selectedTeam}`}/>}/>
    <Route exact path="/teams/:teamName" component={SoldiersPage}/>
    <Route exact path="/teams" component={TeamsPage}/>
    <Route exact path="/settings" component={Settings}/>
    <Route exact path="*" component={NotFoundPage}/>
  </Switch>
))

const App = () => (
  <Shell>
    <StandardRoutes/>
    <Notifications/>
  </Shell>
)

export default App
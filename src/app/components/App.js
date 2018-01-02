// @flow
import React from 'react'
import styled from 'react-emotion'
import {Route, Switch} from 'react-router-dom'
import SoldiersPage from 'soldiers'

import Modal from './Modal'
import Notifications from './Notifications'
import Version from './Version'

export const Root = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  top: 0;
  display: flex;
  flex-direction: column;
`

const NotFoundPage = () => <h1>NOT FOUND</h1>

const StandardRoutes = props => {
  const baseUrl = props.match.url.replace(/\/$/, '')
  return (
    <div>
      <Switch>
        <Route exact path={`${baseUrl}/`} component={SoldiersPage}/>
        <Route exact path="*" component={NotFoundPage}/>
      </Switch>
    </div>
  )
}

const App = () => (
  <Root>
    <Switch>
      <Route path="/" component={StandardRoutes}/>
    </Switch>
    <Modal/>
    <Notifications/>
    <Version hidden/>
  </Root>
)

export default App

import React from 'react'
import {compose} from 'recompose'
import {connect} from 'react-redux'
import {Redirect, Route} from 'react-router-dom'

const NotAuthorized = () => <h1>Not Authorized</h1>

const AuthRoute = ({profile: {data}, roles, ...rest}) => {
  if (!data) {
    return <Redirect to={'/auth/signin'}/>
  }

  if (roles && (!data.roles || !data.roles.contains(roles))) {
    return <NotAuthorized/>
  }

  return <Route {...rest}/>
}

const enhance = compose(connect(({profile}) => ({profile})))

export default enhance(AuthRoute)

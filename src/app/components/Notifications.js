import React from 'react'
import {connect} from 'react-redux'
import NotificationSystem from 'react-notification-system-redux'
// import {translate} from 'react-i18next'
import {compose} from 'recompose'

const Notifications = ({notifications = []} = {}) => {
  return <NotificationSystem notifications={notifications}/>
}

const enhance = compose(
  connect(({notifications}) => ({notifications})),
)
export default enhance(Notifications)

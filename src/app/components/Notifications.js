// @flow
import React from 'react'
import {connect} from 'react-redux'
import NotificationSystem from 'react-notification-system-redux'
import {translate} from 'react-i18next'
import {compose} from 'recompose'

const Notifications = ({notifications, t}) => {
  const translatedNotifications = (notifications || []
  ).map(({message, title, ...rest}) => ({
    message: t(message),
    title: t(title),
    ...rest,
  }))
  return <NotificationSystem notifications={translatedNotifications}/>
}

const enhance = compose(
  connect(({notifications}) => ({notifications})),
  translate('notifications')
)
export default enhance(Notifications)

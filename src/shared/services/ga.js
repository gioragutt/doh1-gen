import ReactGA from 'react-ga'

const gaAppId = process.env.GA_APPID || 'UA-104673518-1'

// eslint-disable-next-line import/prefer-default-export
export const init = history => {
  ReactGA.initialize(gaAppId)
  history.subscribe(location => ReactGA.pageview(location.pathname))
}

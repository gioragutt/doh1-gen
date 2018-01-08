import React from 'react'
import ReactDOM from 'react-dom'
import {I18nextProvider} from 'react-i18next'
import {AppContainer} from 'react-hot-loader'
import {Provider} from 'react-redux'
import {ThemeProvider} from 'emotion-theming'
import createHistory from 'history/createBrowserHistory'
import {ConnectedRouter} from 'react-router-redux'
import App from 'app'

import {theme} from 'shared/style'
import {i18n} from 'shared/services'
import {actions, configureStore} from 'store'
import registerServiceWorker from './registerServiceWorker'

const isProd = process.env.NODE_ENV === 'production'

const history = createHistory()
const store = configureStore(history, i18n, isProd)

store.dispatch(actions.init())

const render = AppComponent => {
  ReactDOM.render(
    <AppContainer>
      <Provider {...{store}}>
        <ConnectedRouter {...{history}}>
          <ThemeProvider {...{theme}}>
            <I18nextProvider {...{i18n}}>
              <AppComponent/>
            </I18nextProvider>
          </ThemeProvider>
        </ConnectedRouter>
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  )
}

render(App)

if (module.hot) {
  module.hot.accept('./app', () => { render(App) })
}

registerServiceWorker()

import React from 'react'
import ReactDOM from 'react-dom'
import {I18nextProvider} from 'react-i18next'
import {AppContainer} from 'react-hot-loader'
import createHistory from 'history/createBrowserHistory'
import {Provider} from 'react-redux'
import {ThemeProvider} from 'emotion-theming'
import {App} from 'app'
import {i18n, intercom} from 'shared/services'
import {theme} from 'shared/style'
import {actions} from 'store'
import {ConnectedRouter} from 'react-router-redux'
import configureStore from 'store/configureStore'

const isProd = process.env.NODE_ENV === 'production'

const history = createHistory()
const store = configureStore(history, i18n, isProd)

store.dispatch(actions.init())

intercom.init(history)

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
  // eslint-disable-next-line global-require
  module.hot.accept('./app', () => render(require('./app').App))
}

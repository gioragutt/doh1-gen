import React from 'react'
import ReactDOM from 'react-dom'
import {I18nextProvider} from 'react-i18next'
import {AppContainer} from 'react-hot-loader'
import {Provider} from 'react-redux'
import App from 'app'
import {ThemeProvider} from 'emotion-theming'
import {theme} from 'shared/style'
import {i18n} from 'shared/services'
import {actions, configureStore} from 'store'
import registerServiceWorker from './registerServiceWorker'

const isProd = process.env.NODE_ENV === 'production'

const store = configureStore(i18n, isProd)

store.dispatch(actions.init())

const render = AppComponent => {
  ReactDOM.render(
    <AppContainer>
      <Provider {...{store}}>
        <ThemeProvider {...{theme}}>
          <I18nextProvider {...{i18n}}>
            <AppComponent/>
          </I18nextProvider>
        </ThemeProvider>
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

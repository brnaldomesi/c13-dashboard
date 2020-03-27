import 'core-js/stable'
import 'regenerator-runtime/runtime'
import './styles/styles.scss'

import * as serviceWorker from './serviceWorker'

import { SNACKBAR_AUTOHIDE_TIMEOUT, SNACKBAR_MAX_STACK } from 'config/constants'
import store, { history } from './redux/store'

import DateFnsUtils from '@date-io/date-fns'
import { IntlProvider } from 'react-intl'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import { Provider } from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'
import ReactGA from 'react-ga'
import Routes from './routes'
import { SnackbarProvider } from 'notistack'
import { ThemeProvider } from '@material-ui/core/styles'
import intlConfig from 'config/intl'
import theme from './config/theme'

const trackingID =
  process.env.NODE_ENV === 'production'
    ? 'UA-105095778-10'
    : process.env.NODE_ENV === 'development'
    ? 'UA-105095778-12'
    : 'UA-105095778-11'

ReactGA.initialize(trackingID)
ReactGA.pageview(window.location.pathname + window.location.search)

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <IntlProvider {...intlConfig}>
        <SnackbarProvider
          maxSnack={SNACKBAR_MAX_STACK}
          autoHideDuration={SNACKBAR_AUTOHIDE_TIMEOUT}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Routes history={history} />
          </MuiPickersUtilsProvider>
        </SnackbarProvider>
      </IntlProvider>
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()

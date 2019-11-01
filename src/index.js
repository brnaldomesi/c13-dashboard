import 'core-js/stable'
import 'regenerator-runtime/runtime'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { SnackbarProvider } from 'notistack'

import { SNACKBAR_MAX_STACK, SNACKBAR_AUTOHIDE_TIMEOUT } from 'config/constants'
import * as serviceWorker from './serviceWorker'
import Routes from './routes'
import store, { history } from './redux/store'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from './config/theme'
import './styles/styles.scss'

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <SnackbarProvider
        maxSnack={SNACKBAR_MAX_STACK}
        autoHideDuration={SNACKBAR_AUTOHIDE_TIMEOUT}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}>
        <Routes history={history} />
      </SnackbarProvider>
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()

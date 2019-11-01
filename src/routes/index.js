import React from 'react'
import { ConnectedRouter } from 'connected-react-router'
import { Route, Switch } from 'react-router-dom'

import AppContainer from 'components/AppContainer'
import ConfirmModal from 'components/ConfirmModal'
import Dashboard from './Dashboard'
import Login from './Login'

const routes = ({ history }) => (
  <ConnectedRouter history={history}>
    <AppContainer>
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/login" exact component={Login} />
      </Switch>
      <ConfirmModal />
    </AppContainer>
  </ConnectedRouter>
)

export default routes

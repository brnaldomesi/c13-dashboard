import React from 'react'
import { ConnectedRouter } from 'connected-react-router'
import { Route, Switch } from 'react-router-dom'

import AppContainer from 'components/AppContainer'
import ConfirmModal from 'components/ConfirmModal'
import Dashboard from './Dashboard'
import Login from './Login'
import MainLayout from 'components/MainLayout'

const routes = ({ history }) => (
  <ConnectedRouter history={history}>
    <AppContainer>
      <MainLayout>
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/:networkId?/:podcastId?/:episodeId?" component={Dashboard} />
        </Switch>
        <ConfirmModal />
      </MainLayout>
    </AppContainer>
  </ConnectedRouter>
)

export default routes

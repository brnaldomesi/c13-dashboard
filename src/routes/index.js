import AppContainer from 'components/AppContainer'
import ConfirmModal from 'components/ConfirmModal'
import { ConnectedRouter } from 'connected-react-router'
import Dashboard from './Dashboard'
import ForgotPassword from './ForgotPassword'
import ForgotPasswordSuccess from './ForgotPassword/ForgotPasswordSuccess'
import Login from './Login'
import LoginRoute from 'components/LoginRoute'
import PrivateRoute from 'components/PrivateRoute'
import React from 'react'
import ResetPassword from './ForgotPassword/ResetPassword'
import { Switch } from 'react-router-dom'
import Users from './Users'

const routes = ({ history }) => (
  <ConnectedRouter history={history}>
    <AppContainer>
      <Switch>
        <LoginRoute path="/login" exact component={Login} />
        <LoginRoute path="/forgotPassword" exact component={ForgotPassword} />
        <LoginRoute path="/forgotPasswordSuccess" exact component={ForgotPasswordSuccess} />
        <LoginRoute path="/resetPassword" component={ResetPassword} />
        <PrivateRoute path="/users" component={Users} />
        <PrivateRoute path="/:networkId?/:podcastId?/:episodeId?" component={Dashboard} />
      </Switch>
      <ConfirmModal />
    </AppContainer>
  </ConnectedRouter>
)

export default routes

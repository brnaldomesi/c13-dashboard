import { Route, Switch } from 'react-router-dom'

import React from 'react'
import UserList from './routes/UserList'

const routes = ({ match }) => (
  <Switch>
    <Route path={`${match.path}`} exact component={UserList} />
  </Switch>
)

export default routes

import { Route, Switch } from 'react-router-dom'

import React from 'react'
import UserList from './routes/UserList'
import UserNew from './routes/UserNew'

const routes = ({ match }) => (
  <Switch>
    <Route path={`${match.path}`} exact component={UserList} />
    <Route path={`${match.path}/new`} exact component={UserNew} />
  </Switch>
)

export default routes

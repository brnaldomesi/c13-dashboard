import MainLayout from 'components/MainLayout'
import React from 'react'
import { Route } from 'react-router-dom'

const PrivateRoute = props => {
  return (
    <MainLayout>
      <Route {...props} />
    </MainLayout>
  )
}

export default PrivateRoute

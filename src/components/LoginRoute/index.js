import LoginLayout from 'components/LoginLayout'
import React from 'react'
import { Route } from 'react-router-dom'

const LoginRoute = props => {
  return (
    <LoginLayout>
      <Route {...props} />
    </LoginLayout>
  )
}

export default LoginRoute

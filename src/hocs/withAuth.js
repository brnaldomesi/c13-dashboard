import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Redirect } from 'react-router-dom'

import { isAuthenticatedSelector } from 'redux/modules/auth'

const selector = createStructuredSelector({
  isAuthenticated: isAuthenticatedSelector
})

export const isAuthenticatedOrRedir = Component => {
  const Wrapper = ({ isAuthenticated, ...props }) =>
    isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
  return connect(selector)(Wrapper)
}

export const isNotAuthenticatedOrRedir = Component => {
  const Wrapper = ({ isAuthenticated, ...props }) => (isAuthenticated ? <Redirect to="/" /> : <Component {...props} />)
  return connect(selector)(Wrapper)
}

export const userIsAuthenticated = Component => {
  const Wrapper = ({ isAuthenticated, ...props }) => (isAuthenticated ? <Component {...props} /> : null)
  return connect(selector)(Wrapper)
}

export const userIsNotAuthenticated = Component => {
  const Wrapper = ({ isAuthenticated, ...props }) => (isAuthenticated ? null : <Component {...props} />)
  return connect(selector)(Wrapper)
}

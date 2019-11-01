import { isRequestPending } from '../api'
import { createSelector } from 'reselect'
import fp from 'lodash/fp'

export const authSelector = fp.get('auth')

export const tokenSelector = createSelector(
  authSelector,
  fp.get('x-auth-token')
)

export const isAuthenticatedSelector = fp.compose(
  Boolean,
  tokenSelector
)

export const isAuthenticatingSelector = state =>
  isRequestPending('authLogin', 'post')(state) && !isAuthenticatedSelector(state)

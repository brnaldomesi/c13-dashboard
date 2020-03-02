import { createSelector } from 'reselect'
import fp from 'lodash/fp'
import { isRequestPending } from '../api'

export const authSelector = fp.get('auth')

export const tokenSelector = createSelector(
  authSelector,
  fp.get('token')
)

export const profileSelector = createSelector(
  authSelector,
  fp.get('profile')
)

export const isAuthenticatedSelector = fp.compose(
  Boolean,
  tokenSelector
)

export const isAuthenticatingSelector = state =>
  isRequestPending('authLogin', 'post')(state) && !isAuthenticatedSelector(state)

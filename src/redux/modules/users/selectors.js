import { createSelector } from 'reselect'
import fp from 'lodash/fp'
import { isRequestPending } from '../api'

export const usersSelector = fp.get('users')

export const usersListSelector = createSelector(
  usersSelector,
  fp.get('usersList')
)

export const userRolesSelector = createSelector(
  usersSelector,
  fp.get('userRoles')
)

export const usersListLoadingSelector = isRequestPending('usersList', 'get')
export const userDeletingSelector = isRequestPending('user', 'delete')

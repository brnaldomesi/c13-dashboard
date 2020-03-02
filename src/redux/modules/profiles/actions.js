import * as types from './types'

import { createAction } from 'redux-actions'

export const getUserPreference = createAction(types.GET_USER_PREFERENCE)
export const updateUserPreference = createAction(types.UPDATE_USER_PREFERENCE)
export const getUserSeries = createAction(types.GET_USER_SERIES)
export const getUsersList = createAction(types.GET_USERS_LIST)
export const getUserRoles = createAction(types.GET_USER_ROLES)

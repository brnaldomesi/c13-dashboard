import { createAction } from 'redux-actions'

import * as types from './types'

export const getUserPreference = createAction(types.GET_USER_PREFERENCE)
export const updateUserPreference = createAction(types.UPDATE_USER_PREFERENCE)
export const getUserSeries = createAction(types.GET_USER_SERIES)

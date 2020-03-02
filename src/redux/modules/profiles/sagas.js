import * as types from './types'

import { apiCallSaga } from '../api'
import { takeLatest } from 'redux-saga/effects'

const getUserPreference = apiCallSaga({
  type: types.GET_USER_PREFERENCE,
  method: 'get',
  allowedParamKeys: [],
  path: '/profiles/getUserPreference',
  selectorKey: 'userPreference'
})

const updateUserPreference = apiCallSaga({
  type: types.UPDATE_USER_PREFERENCE,
  method: 'patch',
  allowedParamKeys: [],
  path: '/profiles/updateUserPreference',
  selectorKey: 'userPreference'
})

const getUserSeries = apiCallSaga({
  type: types.GET_USER_SERIES,
  method: 'get',
  allowedParamKeys: [],
  path: '/profiles/userSeries',
  selectorKey: 'userSeries'
})

const getUsersList = apiCallSaga({
  type: types.GET_USERS_LIST,
  method: 'get',
  allowedParamKeys: [],
  path: '/profiles/users',
  selectorKey: 'usersList'
})

const getUserRoles = apiCallSaga({
  type: types.GET_USER_ROLES,
  method: 'get',
  allowedParamKeys: [],
  path: '/profiles/roles',
  selectorKey: 'userRoles'
})

export default function* rootSaga() {
  yield takeLatest(types.GET_USER_PREFERENCE, getUserPreference)
  yield takeLatest(types.UPDATE_USER_PREFERENCE, updateUserPreference)
  yield takeLatest(types.GET_USER_SERIES, getUserSeries)
  yield takeLatest(types.GET_USERS_LIST, getUsersList)
  yield takeLatest(types.GET_USER_ROLES, getUserRoles)
}

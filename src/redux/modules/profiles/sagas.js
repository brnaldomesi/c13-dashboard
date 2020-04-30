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

export default function* rootSaga() {
  yield takeLatest(types.GET_USER_PREFERENCE, getUserPreference)
  yield takeLatest(types.UPDATE_USER_PREFERENCE, updateUserPreference)
  yield takeLatest(types.GET_USER_SERIES, getUserSeries)
}

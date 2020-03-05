import * as types from './types'

import { call, put, race, takeLatest } from 'redux-saga/effects'

import { apiCallSaga } from '../api'
import { bindCallbackToPromise } from 'utils/helpers'
import { show } from 'redux-modal'

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

const createUser = apiCallSaga({
  type: types.CREATE_USER,
  method: 'post',
  allowedParamKeys: [],
  path: '/profiles',
  selectorKey: 'user'
})

const updateUser = apiCallSaga({
  type: types.UPDATE_USER,
  method: 'patch',
  allowedParamKeys: [],
  path: '/profiles/strongUpdate',
  selectorKey: 'user'
})

const deleteUser = apiCallSaga({
  type: types.DELETE_USER,
  method: 'delete',
  allowedParamKeys: [],
  path: ({ payload }) => `/profiles?id=${payload.id}`,
  selectorKey: 'user'
})

const confirmDelete = function*() {
  const confirmProm = bindCallbackToPromise()
  const cancelProm = bindCallbackToPromise()
  yield put(
    show('confirmModal', {
      onConfirm: confirmProm.cb,
      onCancel: cancelProm.cb,
      title: 'Are you sure you want to delete this user?'
    })
  )
  const result = yield race({
    confirmed: call(confirmProm.promise),
    canceled: call(cancelProm.promise)
  })
  return Object.keys(result).includes('confirmed') ? true : false
}

const confirmAndDeleteUser = function*(action) {
  const confirmed = yield call(confirmDelete)
  if (confirmed) {
    yield call(deleteUser, action)
  }
}

export default function* rootSaga() {
  yield takeLatest(types.GET_USER_PREFERENCE, getUserPreference)
  yield takeLatest(types.UPDATE_USER_PREFERENCE, updateUserPreference)
  yield takeLatest(types.GET_USER_SERIES, getUserSeries)
  yield takeLatest(types.GET_USERS_LIST, getUsersList)
  yield takeLatest(types.GET_USER_ROLES, getUserRoles)
  yield takeLatest(types.CREATE_USER, createUser)
  yield takeLatest(types.UPDATE_USER, updateUser)
  yield takeLatest(types.DELETE_USER, deleteUser)
  yield takeLatest(types.CONFIRM_AND_DELETE_USER, confirmAndDeleteUser)
}

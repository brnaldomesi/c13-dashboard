import * as types from './types'

import { call, put, race, takeLatest } from 'redux-saga/effects'
import {
  createUserSuccess,
  deleteUserSuccess,
  getUserRolesSuccess,
  getUsersListFail,
  getUsersListSuccess,
  updateUserSuccess
} from './actions'

import { apiCallSaga } from '../api'
import { bindCallbackToPromise } from 'utils/helpers'
import { show } from 'redux-modal'

const getUsersList = apiCallSaga({
  type: types.GET_USERS_LIST,
  method: 'get',
  allowedParamKeys: [],
  path: '/profiles/users',
  selectorKey: 'usersList',
  success: function*(payload) {
    yield put(getUsersListSuccess(payload))
  },
  fail: function*(payload) {
    yield put(getUsersListFail(payload))
  }
})

const getUserRoles = apiCallSaga({
  type: types.GET_USER_ROLES,
  method: 'get',
  allowedParamKeys: [],
  path: '/profiles/roles',
  selectorKey: 'userRoles',
  success: function*(payload) {
    yield put(getUserRolesSuccess(payload))
  }
})

const createUser = apiCallSaga({
  type: types.CREATE_USER,
  method: 'post',
  allowedParamKeys: [],
  path: '/profiles',
  selectorKey: 'user',
  success: function*(payload, action) {
    yield put(createUserSuccess({ res: payload, action }))
  }
})

const updateUser = apiCallSaga({
  type: types.UPDATE_USER,
  method: 'patch',
  allowedParamKeys: [],
  path: '/profiles/strongUpdate',
  selectorKey: 'user',
  success: function*(payload) {
    yield put(updateUserSuccess(payload))
  }
})

const deleteUser = apiCallSaga({
  type: types.DELETE_USER,
  method: 'delete',
  allowedParamKeys: [],
  path: ({ payload }) => `/profiles?id=${payload.id}`,
  selectorKey: 'user',
  success: function*(payload, action) {
    yield put(deleteUserSuccess({ res: payload, action }))
  }
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
  yield takeLatest(types.GET_USERS_LIST, getUsersList)
  yield takeLatest(types.GET_USER_ROLES, getUserRoles)
  yield takeLatest(types.CREATE_USER, createUser)
  yield takeLatest(types.UPDATE_USER, updateUser)
  yield takeLatest(types.DELETE_USER, deleteUser)
  yield takeLatest(types.CONFIRM_AND_DELETE_USER, confirmAndDeleteUser)
}

import { AUTH_LOGIN, AUTH_LOGOUT } from './types'
import { authLoginFail, authLoginSuccess, authLogoutSuccess } from './actions'
import { put, takeLatest } from 'redux-saga/effects'

import Cookies from 'js-cookie'
import { apiCallSaga } from '../api'

const authLogin = apiCallSaga({
  type: AUTH_LOGIN,
  method: 'post',
  path: '/authentication/login',
  selectorKey: 'authLogin',
  success: function*(payload) {
    Cookies.set('token', payload['x-auth-token'])
    Cookies.set('userProfile', JSON.stringify(payload.profile))
    yield put(authLoginSuccess(payload))
  },
  fail: function*(payload) {
    yield put(authLoginFail(payload))
  }
})

const handleLogout = function*(payload) {
  document.cookie = ''
  Cookies.remove('token')
  Cookies.remove('userProfile')
  yield put(authLogoutSuccess(payload))
}

const authLogout = apiCallSaga({
  type: AUTH_LOGOUT,
  method: 'post',
  path: '/authentication/logout',
  selectorKey: 'authLogout',
  success: handleLogout,
  fail: handleLogout
})

export default function* rootSaga() {
  yield takeLatest(AUTH_LOGIN, authLogin)
  yield takeLatest(AUTH_LOGOUT, authLogout)
}

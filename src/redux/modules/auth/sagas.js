import { put, takeLatest } from 'redux-saga/effects'

import { apiCallSaga } from '../api'
import { AUTH_LOGIN, AUTH_LOGOUT } from './types'
import { authLoginSuccess, authLoginFail } from './actions'
import { saveData } from 'utils/storage'
import Cookies from 'js-cookie'

const authLogin = apiCallSaga({
  type: AUTH_LOGIN,
  method: 'post',
  path: '/authentication/login',
  selectorKey: 'authLogin',
  success: function*(payload) {
    saveData({ auth: payload })
    Cookies.set('token', payload['x-auth-token'])
    Cookies.set('userProfile', payload.profile)
    yield put(authLoginSuccess(payload))
  },
  fail: function*(payload) {
    yield put(authLoginFail(payload))
  }
})

const authLogout = function*(action) {
  yield saveData({ auth: null })
}

export default function* rootSaga() {
  yield takeLatest(AUTH_LOGIN, authLogin)
  yield takeLatest(AUTH_LOGOUT, authLogout)
}

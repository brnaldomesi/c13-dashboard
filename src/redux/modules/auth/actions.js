import * as types from './types'

import { createAction } from 'redux-actions'

export const authLogin = createAction(types.AUTH_LOGIN)

export const authLoginSuccess = createAction(types.AUTH_LOGIN_SUCCESS)

export const authLoginFail = createAction(types.AUTH_LOGIN_FAIL)

export const authLogout = createAction(types.AUTH_LOGOUT)

export const authLogoutSuccess = createAction(types.AUTH_LOGOUT_SUCCESS)

export const authForgotPassword = createAction(types.AUTH_FORGOT_PASSWORD)

export const authValidateToken = createAction(types.AUTH_VALIDATE_TOKEN)

export const authResetPassword = createAction(types.AUTH_RESET_PASSWORD)

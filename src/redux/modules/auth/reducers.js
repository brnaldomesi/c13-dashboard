import * as types from './types'

import fp from 'lodash/fp'
import { handleActions } from 'redux-actions'

const getCookieVars = fp.compose(
  fp.fromPairs,
  fp.map(fp.split('=')),
  fp.map(fp.trim),
  fp.split(';'),
  fp.get('cookie')
)

const getInitialState = () => {
  const cookieVars = getCookieVars(document)
  return {
    token: cookieVars['token'],
    profile: cookieVars.userProfile ? JSON.parse(decodeURIComponent(cookieVars.userProfile)) : null
  }
}

export default handleActions(
  {
    [types.AUTH_LOGIN_SUCCESS]: (state, { payload }) => ({
      ...state,
      token: payload['x-auth-token'],
      profile: payload.profile
    }),
    [types.AUTH_LOGOUT_SUCCESS]: (state, { payload }) => ({
      ...state,
      profile: null,
      token: null
    })
  },
  getInitialState()
)

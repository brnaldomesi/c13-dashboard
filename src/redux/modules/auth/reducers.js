import { handleActions } from 'redux-actions'
import get from 'lodash/get'

import * as types from './types'
import { loadData } from 'utils/storage'

const getInitialState = () => {
  const { auth } = loadData()
  return {
    'x-auth-token': get(auth, 'x-auth-token') || null,
    profile: get(auth, 'profile') || null
  }
}

export default handleActions(
  {
    [types.AUTH_LOGIN_SUCCESS]: (state, { payload }) => ({
      ...state,
      ...payload
    }),
    [types.AUTH_LOGOUT]: (state, { payload }) => ({
      ...state,
      profile: null,
      'x-auth-token': null
    })
  },
  getInitialState()
)

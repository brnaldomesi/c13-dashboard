import * as types from './types'

import { handleActions } from 'redux-actions'

const getInitialState = () => ({
  usersList: [],
  userRoles: []
})

export default handleActions(
  {
    [types.GET_USERS_LIST_SUCCESS]: (state, { payload }) => ({
      ...state,
      usersList: payload
    }),
    [types.GET_USERS_LIST_FAIL]: (state, { payload }) => ({
      ...state
    }),
    [types.GET_USER_ROLES_SUCCESS]: (state, { payload }) => ({
      ...state,
      userRoles: payload
    }),
    [types.CREATE_USER_SUCCESS]: (state, { payload }) => {
      const {
        res,
        action: {
          payload: { componentData }
        }
      } = payload
      const addedUser = {
        userID: res.profileId,
        firstName: res.firstName,
        lastName: res.lastName,
        network: {
          networkID: res.networkId,
          networkName: componentData.networkName
        },
        email: res.email,
        userRole: res.role
      }
      state.usersList.push(addedUser)

      return state
    },
    [types.UPDATE_USER_SUCCESS]: (state, { payload }) => {
      const updatedUser = state.usersList.find(user => user.userID === payload.profileId)
      updatedUser.firstName = payload.firstName
      updatedUser.lastName = payload.lastName
      updatedUser.email = payload.email

      return {
        ...state,
        usersList: state.usersList.map(user => (user.userID === payload.profileId ? updatedUser : user))
      }
    },
    [types.DELETE_USER_SUCCESS]: (
      state,
      {
        payload: {
          action: {
            payload: { id }
          }
        }
      }
    ) => ({
      ...state,
      usersList: state.usersList.filter(user => user.userID !== id)
    })
  },
  getInitialState()
)

import * as types from './types'

import { createAction } from 'redux-actions'

export const getUsersList = createAction(types.GET_USERS_LIST)
export const getUsersListSuccess = createAction(types.GET_USERS_LIST_SUCCESS)
export const getUsersListFail = createAction(types.GET_USERS_LIST_FAIL)
export const getUserRoles = createAction(types.GET_USER_ROLES)
export const getUserRolesSuccess = createAction(types.GET_USER_ROLES_SUCCESS)
export const createUser = createAction(types.CREATE_USER)
export const createUserSuccess = createAction(types.CREATE_USER_SUCCESS)
export const updateUser = createAction(types.UPDATE_USER)
export const updateUserSuccess = createAction(types.UPDATE_USER_SUCCESS)
export const deleteUser = createAction(types.DELETE_USER)
export const deleteUserSuccess = createAction(types.DELETE_USER_SUCCESS)
export const confirmAndDeleteUser = createAction(types.CONFIRM_AND_DELETE_USER)
export const editPrivileges = createAction(types.EDIT_PRIVILEGES)

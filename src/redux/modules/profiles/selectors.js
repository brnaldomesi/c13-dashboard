import { dataSelector, isRequestPending } from '../api'

export const userPreferenceSelector = dataSelector('userPreference')
export const userSeriesSelector = dataSelector('userSeries')
export const usersListSelector = dataSelector('usersList')
export const userRolesSelector = dataSelector('userRoles', [])

export const userSeriesLoadingSelector = isRequestPending('userSeries', 'get')

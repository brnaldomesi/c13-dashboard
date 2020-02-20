import { dataSelector, isRequestPending } from '../api'

export const userPreferenceSelector = dataSelector('userPreference')
export const userSeriesSelector = dataSelector('userSeries')
export const usersListSelector = dataSelector('usersList')

export const userSeriesLoadingSelector = isRequestPending('userSeries', 'get')

import { dataSelector, isRequestPending } from '../api'

export const networksSelector = dataSelector('networks', [])
export const episodesSelector = dataSelector('episodes', [])

export const networksLoadingSelector = isRequestPending('networks', 'get')
export const episodesLoadingSelector = isRequestPending('episodes', 'get')

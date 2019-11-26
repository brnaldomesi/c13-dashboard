import { dataSelector, isRequestPending } from '../api'

export const summariesSelector = dataSelector('summaries', null)

export const summariesLoadingSelector = isRequestPending('summaries', 'get')

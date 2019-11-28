import { dataSelector, isRequestPending } from '../api'

export const summariesSelector = dataSelector('summaries', null)
export const totalsAndTrendsSelector = dataSelector('totalsAndTrends', null)

export const summariesLoadingSelector = isRequestPending('summaries', 'get')
export const totalsAndTrendsLoadingSelector = isRequestPending('totalsAndTrends ', 'get')

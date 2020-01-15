import { dataSelector, isRequestPending } from '../api'

export const summariesSelector = dataSelector('summaries', null)
export const totalsAndTrendsSelector = dataSelector('totalsAndTrends', null)
export const topTrendingsSelector = dataSelector('topTrendings', [])
export const downloadsBySourceSelector = dataSelector('downloadsBySource', null)
export const downloadsByMarketSelector = dataSelector('downloadsByMarket', null)
export const downloadsByRegionSelector = dataSelector('downloadsByRegion', null)

export const summariesLoadingSelector = isRequestPending('summaries', 'get')
export const totalsAndTrendsLoadingSelector = isRequestPending('totalsAndTrends ', 'get')
export const topTrendingsLoadingSelector = isRequestPending('topTrendings', 'get')
export const downloadsBySourceLoadingSelector = isRequestPending('downloadsBySource', 'get')
export const downloadsByMarketLoadingSelector = isRequestPending('downloadsByMarket', 'get')
export const downloadsByRegionLoadingSelector = isRequestPending('downloadsByRegion', 'get')

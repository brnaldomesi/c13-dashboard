import * as types from './types'

import { createAction } from 'redux-actions'

export const getSummaries = createAction(types.GET_SUMMARIES)
export const getTotalsAndTrends = createAction(types.GET_TOTALS_AND_TRENDS)
export const getTopTrendings = createAction(types.GET_TOP_TRENDINGS)
export const getDownloadsBySource = createAction(types.GET_DOWNLOADS_BY_SOURCE)
export const getDownloadsByMarket = createAction(types.GET_DOWNLOADS_BY_MARKET)
export const getDownloadsByRegion = createAction(types.GET_DOWNLOADS_BY_REGION)

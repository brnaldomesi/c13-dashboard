import { createAction } from 'redux-actions'

import * as types from './types'

export const getSummaries = createAction(types.GET_SUMMARIES)
export const getTotalsAndTrends = createAction(types.GET_TOTALS_AND_TRENDS)

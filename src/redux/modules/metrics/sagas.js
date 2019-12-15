import { takeLatest } from 'redux-saga/effects'

import { apiCallSaga } from '../api'
import * as types from './types'

const getSummaries = apiCallSaga({
  type: types.GET_SUMMARIES,
  method: 'get',
  allowedParamKeys: [],
  path: '/metrics/summaries',
  selectorKey: 'summaries'
})

const getTotalsAndTrends = apiCallSaga({
  type: types.GET_TOTALS_AND_TRENDS,
  method: 'get',
  allowedParamKeys: [],
  path: '/metrics/totalsAndTrends',
  selectorKey: 'totalsAndTrends'
})

const getTopTrendings = apiCallSaga({
  type: types.GET_TOP_TRENDINGS,
  method: 'get',
  allowedParamKeys: ['amount'],
  path: '/metrics/topTrending',
  selectorKey: 'topTrendings'
})

export default function* rootSaga() {
  yield takeLatest(types.GET_SUMMARIES, getSummaries)
  yield takeLatest(types.GET_TOTALS_AND_TRENDS, getTotalsAndTrends)
  yield takeLatest(types.GET_TOP_TRENDINGS, getTopTrendings)
}

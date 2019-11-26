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

export default function* rootSaga() {
  yield takeLatest(types.GET_SUMMARIES, getSummaries)
}

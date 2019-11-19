import { takeLatest } from 'redux-saga/effects'
import fp from 'lodash/fp'

import { apiCallSaga } from '../api'
import * as types from './types'

const getNetworks = apiCallSaga({
  type: types.GET_NETWORKS,
  method: 'get',
  allowedParamKeys: [],
  path: '/media/networks',
  selectorKey: 'networks'
})

const getEpisodes = apiCallSaga({
  type: types.GET_EPISODES,
  method: 'get',
  allowedParamKeys: [],
  path: ({ payload }) => `/media/series/${payload.podcastId}/episode`,
  selectorKey: 'episodes',
  payloadOnSuccess: fp.compose(
    fp.reverse,
    fp.sortBy('publishDate')
  )
})

export default function* rootSaga() {
  yield takeLatest(types.GET_NETWORKS, getNetworks)
  yield takeLatest(types.GET_EPISODES, getEpisodes)
}

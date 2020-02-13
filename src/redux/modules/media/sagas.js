import * as types from './types'

import { apiCallSaga } from '../api'
import fp from 'lodash/fp'
import { takeLatest } from 'redux-saga/effects'

const getNetworks = apiCallSaga({
  type: types.GET_NETWORKS,
  method: 'get',
  allowedParamKeys: [],
  path: '/media/networks',
  selectorKey: 'networks',
  payloadOnSuccess: fp.sortBy('name')
})

const getEpisodes = apiCallSaga({
  type: types.GET_EPISODES,
  method: 'get',
  allowedParamKeys: [],
  path: ({ payload }) => `/media/series/${payload.podcastId}/episode`,
  selectorKey: 'episodes',
  payloadOnSuccess: fp.sortBy('publishDate')
})

const getMediaRankingTables = apiCallSaga({
  type: types.GET_MEDIA_RANKING_TABLES,
  method: 'get',
  allowedParamKeys: [],
  path: '/dashboard/mediaRankingTables',
  selectorKey: 'mediaRankingTables'
})

const getActivePodcasts = apiCallSaga({
  type: types.GET_ACTIVE_PODCASTS,
  method: 'get',
  path: '/media/allSeries',
  selectorKey: 'activePodcasts'
})

export default function* rootSaga() {
  yield takeLatest(types.GET_EPISODES, getEpisodes)
  yield takeLatest(types.GET_MEDIA_RANKING_TABLES, getMediaRankingTables)
  yield takeLatest(types.GET_NETWORKS, getNetworks)
  yield takeLatest(types.GET_ACTIVE_PODCASTS, getActivePodcasts)
}

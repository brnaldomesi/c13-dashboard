import * as types from './types'

import Cookies from 'js-cookie'
import { apiCallSaga } from '../api'
import fp from 'lodash/fp'
import { takeLatest } from 'redux-saga/effects'

const getNetworks = apiCallSaga({
  type: types.GET_NETWORKS,
  method: 'get',
  allowedParamKeys: [],
  path: '/media/networks',
  selectorKey: 'networks',
  payloadOnSuccess: networks => {
    const profile = JSON.parse(Cookies.get('userProfile'))
    if (profile.role === 'NETWORK_USER') {
      return networks.filter(network => network.networkId === profile.networkName)
    } else {
      return fp.sortBy('name')(networks)
    }
  }
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

const getPodcasts = apiCallSaga({
  type: types.GET_PODCASTS,
  method: 'get',
  path: ({ payload }) => `/media/series?networkId=${payload.networkId}`,
  selectorKey: 'podcasts'
})

const getPodcastsByNetwork = apiCallSaga({
  type: types.GET_PODCASTS_BY_NETWORK,
  method: 'get',
  path: ({ payload }) => `/media/series?networkId=${payload.networkId}&profileId=${payload.profileId}`,
  selectorKey: 'podcastsByNetwork'
})

export default function* rootSaga() {
  yield takeLatest(types.GET_EPISODES, getEpisodes)
  yield takeLatest(types.GET_MEDIA_RANKING_TABLES, getMediaRankingTables)
  yield takeLatest(types.GET_NETWORKS, getNetworks)
  yield takeLatest(types.GET_ACTIVE_PODCASTS, getActivePodcasts)
  yield takeLatest(types.GET_PODCASTS, getPodcasts)
  yield takeLatest(types.GET_PODCASTS_BY_NETWORK, getPodcastsByNetwork)
}

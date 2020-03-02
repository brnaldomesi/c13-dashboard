import * as types from './types'

import { createAction } from 'redux-actions'

export const getNetworks = createAction(types.GET_NETWORKS)
export const getEpisodes = createAction(types.GET_EPISODES)
export const getMediaRankingTables = createAction(types.GET_MEDIA_RANKING_TABLES)
export const getActivePodcasts = createAction(types.GET_ACTIVE_PODCASTS)
export const getPodcasts = createAction(types.GET_PODCASTS)

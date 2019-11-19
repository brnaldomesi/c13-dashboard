import { createAction } from 'redux-actions'

import * as types from './types'

export const getNetworks = createAction(types.GET_NETWORKS)
export const getEpisodes = createAction(types.GET_EPISODES)

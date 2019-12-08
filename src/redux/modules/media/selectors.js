import find from 'lodash/find'

import { dataSelector, isRequestPending } from '../api'
import { getRankings } from 'utils/helpers'

export const networksSelector = dataSelector('networks', [])
export const episodesSelector = dataSelector('episodes', [])
export const mediaRankingTablesSelector = dataSelector('mediaRankingTables', [])

export const networksLoadingSelector = isRequestPending('networks', 'get')
export const episodesLoadingSelector = isRequestPending('episodes', 'get')
export const mediaRankingTablesLoadingSelector = isRequestPending('mediaRankingTables', 'get')

export const networksRankingsSelector = state => {
  const networks = networksSelector(state)
  const mediaRankingTables = mediaRankingTablesSelector(state)
  return networks.map(network => {
    const downloads = find(mediaRankingTables, { mediaId: network.networkId })
    return {
      ...network,
      downloads,
      rankings: downloads ? getRankings(downloads, mediaRankingTables) : null
    }
  })
}

export const episodesRankingsSelector = state => {
  const episodes = episodesSelector(state)
  const mediaRankingTables = mediaRankingTablesSelector(state)
  return episodes.map(episode => {
    const downloads = find(mediaRankingTables, { mediaId: episode.episodeId })
    return {
      ...episode,
      downloads,
      rankings: downloads ? getRankings(downloads, mediaRankingTables) : null
    }
  })
}

export const networksRankingsLoadingSelector = state =>
  networksLoadingSelector(state) && mediaRankingTablesLoadingSelector(state)

export const episodesRankingsLoadingSelector = state =>
  episodesLoadingSelector(state) && mediaRankingTablesLoadingSelector(state)

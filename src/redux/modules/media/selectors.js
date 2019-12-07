import find from 'lodash/find'

import { dataSelector, isRequestPending } from '../api'

export const networksSelector = dataSelector('networks', [])
export const episodesSelector = dataSelector('episodes', [])
export const mediaRankingTablesSelector = dataSelector('mediaRankingTables', [])

export const networksLoadingSelector = isRequestPending('networks', 'get')
export const episodesLoadingSelector = isRequestPending('episodes', 'get')
export const mediaRankingTablesLoadingSelector = isRequestPending('mediaRankingTables', 'get')

const getRankings = (item, list) =>
  list.reduce(
    (acc, listItem) => {
      Object.keys(acc).forEach(key => {
        if (listItem[key] > item[key]) {
          acc[key]++
        }
      })
      return acc
    },
    {
      dayOneDownloads: 1,
      weekOneDownloads: 1,
      totalDownloads: 1
    }
  )

export const networksRankingsSelector = state => {
  const networks = networksSelector(state)
  const mediaRankingTables = mediaRankingTablesSelector(state)
  return networks.map(network => {
    const downloads = find(mediaRankingTables, { mediaId: network.networkId })
    return {
      ...network,
      downloads,
      rankings: getRankings(downloads, mediaRankingTables)
    }
  })
}

export const networksRankingsLoadingSelector = state =>
  networksLoadingSelector(state) && mediaRankingTablesLoadingSelector(state)

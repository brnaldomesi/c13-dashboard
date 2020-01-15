import React, { useEffect } from 'react'
import {
  getDownloadsByMarket,
  getDownloadsByRegion,
  getDownloadsBySource,
  getTopTrendings
} from 'redux/modules/metrics'
import { getEpisodes, getMediaRankingTables, getNetworks } from 'redux/modules/media'
import { getUserSeries, userPreferenceSelector } from 'redux/modules/profiles'

import DownloadsByMarket from 'components/DownloadsByMarket'
import DownloadsByRegion from 'components/DownloadsByRegion'
import DownloadsBySource from 'components/DownloadsBySource'
import EpisodesTable from 'components/EpisodesTable'
import MediaInfo from 'components/MediaInfo'
import NetworksTable from 'components/NetworksTable'
import PodcastsTable from 'components/PodcastsTable'
import PropTypes from 'prop-types'
import Summaries from 'components/Summaries'
import TopTrendings from 'components/TopTrendings'
import TotalAndHourly from 'components/TotalAndHourly'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import get from 'lodash/get'
import { isAuthenticatedOrRedir } from 'hocs/withAuth'
import styles from './styles'
import withLocationToPreference from 'hocs/withLocationToPreference'
import { withStyles } from '@material-ui/core/styles'

const renderMediaTable = ({ networkId, podcastId, episodeId }) => {
  if (episodeId) {
    return null
  } else if (podcastId) {
    return <EpisodesTable />
  } else if (networkId) {
    return <PodcastsTable networkId={networkId} />
  } else {
    return <NetworksTable />
  }
}

const Dashboard = ({
  classes,
  getDownloadsByRegion,
  getDownloadsByMarket,
  getDownloadsBySource,
  getEpisodes,
  getMediaRankingTables,
  getNetworks,
  getTopTrendings,
  getUserSeries,
  userPreference
}) => {
  const episodeId = get(userPreference, 'episodeId')
  const networkId = get(userPreference, 'networkId')
  const podcastId = get(userPreference, 'seriesId')

  useEffect(() => {
    getNetworks()
  }, [getNetworks, getMediaRankingTables])

  useEffect(() => {
    if (networkId) {
      getUserSeries()
    }
  }, [networkId, getUserSeries, getMediaRankingTables])

  useEffect(() => {
    if (podcastId && networkId) {
      getEpisodes({ podcastId })
    }
    if (!episodeId) {
      getMediaRankingTables()
      getTopTrendings({ params: { amount: 10 } })
      getDownloadsBySource({ params: { entryCount: 10 } })
      getDownloadsByMarket({ params: { entryCount: 10 } })
      getDownloadsByRegion({ params: { entryCount: 213 } })
    }
  }, [
    networkId,
    podcastId,
    episodeId,
    getEpisodes,
    getMediaRankingTables,
    getTopTrendings,
    getDownloadsBySource,
    getDownloadsByMarket,
    getDownloadsByRegion
  ])

  return (
    <div className={classes.root}>
      <MediaInfo />
      <Summaries />
      <TotalAndHourly />
      {renderMediaTable({ networkId, podcastId, episodeId })}
      {!episodeId && <TopTrendings />}
      <DownloadsBySource />
      <DownloadsByMarket />
      <DownloadsByRegion />
    </div>
  )
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  getEpisodes: PropTypes.func.isRequired,
  getMediaRankingTables: PropTypes.func.isRequired,
  getNetworks: PropTypes.func.isRequired,
  getTopTrendings: PropTypes.func.isRequired,
  getUserSeries: PropTypes.func.isRequired
}

const selector = createStructuredSelector({
  userPreference: userPreferenceSelector
})

const actions = {
  getDownloadsByRegion,
  getDownloadsByMarket,
  getDownloadsBySource,
  getEpisodes,
  getMediaRankingTables,
  getNetworks,
  getTopTrendings,
  getUserSeries
}

export default compose(
  isAuthenticatedOrRedir,
  connect(selector, actions),
  withLocationToPreference,
  withStyles(styles)
)(Dashboard)

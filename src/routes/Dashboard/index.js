import React, { useEffect } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { withStyles } from '@material-ui/core/styles'
import get from 'lodash/get'
import PropTypes from 'prop-types'

import { isAuthenticatedOrRedir } from 'hocs/withAuth'
import { getEpisodes, getNetworks, getMediaRankingTables } from 'redux/modules/media'
import { getUserPreference, getUserSeries, userPreferenceSelector } from 'redux/modules/profiles'
import { getTopTrendings } from 'redux/modules/metrics'
import EpisodesTable from 'components/EpisodesTable'
import MediaInfo from 'components/MediaInfo'
import NetworksTable from 'components/NetworksTable'
import PodcastsTable from 'components/PodcastsTable'
import Summaries from 'components/Summaries'
import TopTrendings from 'components/TopTrendings'
import TotalAndHourly from 'components/TotalAndHourly'
import styles from './styles'

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
  getEpisodes,
  getMediaRankingTables,
  getNetworks,
  getTopTrendings,
  getUserSeries,
  getUserPreference,
  userPreference
}) => {
  const episodeId = get(userPreference, 'episodeId')
  const networkId = get(userPreference, 'networkId')
  const podcastId = get(userPreference, 'seriesId')

  useEffect(() => {
    getNetworks()
  }, [getNetworks, getMediaRankingTables])

  useEffect(() => {
    getUserPreference()
  }, [getUserPreference])

  useEffect(() => {
    if (networkId) {
      getUserSeries()
    }
  }, [networkId, getUserSeries, getMediaRankingTables])

  useEffect(() => {
    if (podcastId && networkId) {
      getEpisodes({ podcastId })
    }
    getMediaRankingTables()
    getTopTrendings({ params: { amount: 10 } })
  }, [networkId, podcastId, getEpisodes, getMediaRankingTables, getTopTrendings])

  return (
    <div className={classes.root}>
      <MediaInfo />
      <Summaries />
      <TotalAndHourly />
      {renderMediaTable({ networkId, podcastId, episodeId })}
      {!episodeId && <TopTrendings />}
    </div>
  )
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  getUserPreference: PropTypes.func.isRequired
}

const selector = createStructuredSelector({
  userPreference: userPreferenceSelector
})

const actions = {
  getEpisodes,
  getMediaRankingTables,
  getNetworks,
  getTopTrendings,
  getUserPreference,
  getUserSeries
}

export default compose(
  isAuthenticatedOrRedir,
  connect(
    selector,
    actions
  ),
  withStyles(styles)
)(Dashboard)

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
import EpisodesTable from 'components/EpisodesTable'
import MediaInfo from 'components/MediaInfo'
import NetworksTable from 'components/NetworksTable'
import PodcastsTable from 'components/PodcastsTable'
import Summaries from 'components/Summaries'
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
  getUserSeries,
  getUserPreference,
  userPreference
}) => {
  const episodeId = get(userPreference, 'episodeId')
  const networkId = get(userPreference, 'networkId')
  const podcastId = get(userPreference, 'seriesId')

  useEffect(() => {
    getNetworks()
    getMediaRankingTables()
  }, [getNetworks, getMediaRankingTables])

  useEffect(() => {
    getUserPreference()
  }, [getUserPreference])

  useEffect(() => {
    if (networkId) {
      getUserSeries()
    }
    getMediaRankingTables()
  }, [networkId, getUserSeries, getMediaRankingTables])

  useEffect(() => {
    if (podcastId && networkId) {
      getEpisodes({ podcastId })
      getMediaRankingTables()
    }
  }, [networkId, podcastId, getEpisodes, getMediaRankingTables])

  return (
    <div className={classes.root}>
      <MediaInfo />
      <Summaries />
      <TotalAndHourly />
      {renderMediaTable({ networkId, podcastId, episodeId })}
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

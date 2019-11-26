import React, { useEffect } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { withStyles } from '@material-ui/core/styles'
import get from 'lodash/get'
import PropTypes from 'prop-types'

import { isAuthenticatedOrRedir } from 'hocs/withAuth'
import { getEpisodes, getNetworks } from 'redux/modules/media'
import { getUserPreference, getUserSeries, userPreferenceSelector } from 'redux/modules/profiles'
import MediaInfo from 'components/MediaInfo'
import Summaries from 'components/Summaries'
import styles from './styles'

const Dashboard = ({ classes, getEpisodes, getNetworks, getUserSeries, getUserPreference, userPreference }) => {
  const networkId = get(userPreference, 'networkId')
  const podcastId = get(userPreference, 'seriesId')

  useEffect(() => {
    getNetworks()
  }, [getNetworks])

  useEffect(() => {
    getUserPreference()
  }, [getUserPreference])

  useEffect(() => {
    if (networkId) {
      getUserSeries()
    }
  }, [networkId, getUserSeries])

  useEffect(() => {
    if (podcastId && networkId) {
      getEpisodes({ podcastId })
    }
  }, [networkId, podcastId, getEpisodes])

  return (
    <div className={classes.root}>
      <MediaInfo />
      <Summaries />
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

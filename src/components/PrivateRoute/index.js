import React, { useEffect } from 'react'
import { activePodcastsSelector, getMediaRankingTables, getNetworks } from 'redux/modules/media'

import MainLayout from 'components/MainLayout'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { getActivePodcasts } from 'redux/modules/media'
import { isAuthenticatedOrRedir } from 'hocs/withAuth'

const PrivateRoute = props => {
  const { activePodcasts, getActivePodcasts, getNetworks, getMediaRankingTables } = props

  useEffect(() => {
    if (activePodcasts.length === 0) {
      getActivePodcasts()
    }
  }, [getActivePodcasts, activePodcasts.length])

  useEffect(() => {
    getNetworks()
  }, [getNetworks, getMediaRankingTables])

  return (
    <MainLayout>
      <Route {...props} />
    </MainLayout>
  )
}

PrivateRoute.propTypes = {
  activePodcasts: PropTypes.array,
  getMediaRankingTables: PropTypes.func.isRequired,
  getNetworks: PropTypes.func.isRequired
}

const selector = createStructuredSelector({
  activePodcasts: activePodcastsSelector
})

const actions = {
  getActivePodcasts,
  getMediaRankingTables,
  getNetworks
}

export default compose(
  isAuthenticatedOrRedir,
  connect(
    selector,
    actions
  )
)(PrivateRoute)

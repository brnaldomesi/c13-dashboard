import React, { useEffect } from 'react'
import { getMediaRankingTables, getNetworks } from 'redux/modules/media'
import { getUserPreference, getUserRoles, userRolesSelector } from 'redux/modules/profiles'

import MainLayout from 'components/MainLayout'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { getActivePodcasts } from 'redux/modules/media'
import { isAuthenticatedOrRedir } from 'hocs/withAuth'
import { profileSelector } from 'redux/modules/auth'

const PrivateRoute = props => {
  const { getActivePodcasts, getNetworks, getMediaRankingTables, profile, getUserPreference, getUserRoles } = props

  useEffect(() => {
    getActivePodcasts()
  }, [getActivePodcasts])

  useEffect(() => {
    getNetworks()
  }, [getNetworks, getMediaRankingTables])

  useEffect(() => {
    if (profile.role === 'ADMIN') {
      getUserPreference()
    }
  }, [getUserPreference, profile.role])

  useEffect(() => {
    if (profile.role === 'ADMIN') {
      getUserRoles()
    }
  }, [getUserRoles, profile.role])

  return (
    <MainLayout>
      <Route {...props} />
    </MainLayout>
  )
}

PrivateRoute.propTypes = {
  getMediaRankingTables: PropTypes.func.isRequired,
  getNetworks: PropTypes.func.isRequired,
  getUserPreference: PropTypes.func,
  getUserRoles: PropTypes.func
}

const actions = {
  getActivePodcasts,
  getMediaRankingTables,
  getNetworks,
  getUserPreference,
  getUserRoles
}

const selector = createStructuredSelector({
  profile: profileSelector,
  roles: userRolesSelector
})

export default compose(
  isAuthenticatedOrRedir,
  connect(
    selector,
    actions
  )
)(PrivateRoute)

import React, { useEffect } from 'react'
import { getUserPreference, updateUserPreference, userPreferenceSelector } from 'redux/modules/profiles'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { profileSelector } from 'redux/modules/auth'

const selector = createStructuredSelector({
  userPreference: userPreferenceSelector,
  profile: profileSelector
})

const actions = {
  getUserPreference,
  updateUserPreference
}

const withLocationToPreference = WrappedComponent => {
  const LocationToPreferenceWrapper = props => {
    const {
      getUserPreference,
      match: { params },
      updateUserPreference,
      userPreference,
      profile: { role }
    } = props
    const { networkId = null, podcastId = null, episodeId = null } = params
    useEffect(() => {
      getUserPreference()
    }, [getUserPreference])

    useEffect(() => {
      if (
        userPreference &&
        role !== 'NETWORK_USER' &&
        (userPreference.networkId !== networkId ||
          userPreference.seriesId !== podcastId ||
          userPreference.episodeId !== episodeId)
      ) {
        updateUserPreference({
          data: {
            ...userPreference,
            networkId,
            seriesId: podcastId,
            episodeId
          }
        })
      }
    }, [userPreference, updateUserPreference, networkId, podcastId, episodeId, role])

    return <WrappedComponent {...props} />
  }
  return connect(
    selector,
    actions
  )(LocationToPreferenceWrapper)
}

export default withLocationToPreference

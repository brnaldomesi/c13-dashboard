import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { getUserPreference, updateUserPreference, userPreferenceSelector } from 'redux/modules/profiles'

const selector = createStructuredSelector({
  userPreference: userPreferenceSelector
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
      userPreference
    } = props
    const { networkId = null, podcastId = null, episodeId = null } = params
    useEffect(() => {
      getUserPreference()
    }, [getUserPreference])

    useEffect(() => {
      if (
        userPreference &&
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
    }, [userPreference, updateUserPreference, networkId, podcastId, episodeId])

    return <WrappedComponent {...props} />
  }
  return connect(
    selector,
    actions
  )(LocationToPreferenceWrapper)
}

export default withLocationToPreference

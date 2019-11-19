import React, { useCallback, useEffect } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import get from 'lodash/get'
import Collapse from '@material-ui/core/Collapse'
import Divider from '@material-ui/core/Divider'
import IconCast from '@material-ui/icons/Cast'
import List from '@material-ui/core/List'
import PropTypes from 'prop-types'

import { getUserSeries, userSeriesSelector } from 'redux/modules/profiles'
import { updateUserPreference, userPreferenceSelector } from 'redux/modules/profiles'
import SidebarItem from '../SidebarItem'
import SidebarSubItem from '../SidebarSubItem'

const SidebarPodcasts = ({ getUserSeries, userSeries, open, onToggle, updateUserPreference, userPreference }) => {
  const handleToggle = useCallback(() => onToggle('podcasts'), [onToggle])
  const handleClickItem = useCallback(
    podcastId => () => {
      updateUserPreference({
        data: {
          ...userPreference,
          seriesId: podcastId,
          episodeId: null
        }
      })
      onToggle('podcasts')
    },
    [onToggle, updateUserPreference, userPreference]
  )
  const networkId = get(userPreference, 'networkId')
  const podcasts = get(userSeries, networkId) || []

  useEffect(() => {
    if (networkId) {
      getUserSeries()
    }
  }, [networkId])

  return networkId ? (
    <>
      <List>
        <SidebarItem icon={IconCast} text="Podcasts" onClick={handleToggle} hasSubItems open={open} />
        <Collapse in={open}>
          <List component="nav" dense>
            {podcasts.map(podcast => (
              <SidebarSubItem
                text={podcast.name}
                key={podcast.seriesId}
                selected={userPreference.seriesId === podcast.seriesId}
                onClick={handleClickItem(podcast.seriesId)}
              />
            ))}
          </List>
        </Collapse>
      </List>
      <Divider />
    </>
  ) : null
}

SidebarPodcasts.propTypes = {
  onToggle: PropTypes.func.isRequired,
  open: PropTypes.bool,
  updateUserPreference: PropTypes.func.isRequired,
  userPreference: PropTypes.object,
  userSeries: PropTypes.object
}

const selector = createStructuredSelector({
  userSeries: userSeriesSelector,
  userPreference: userPreferenceSelector
})

const actions = {
  getUserSeries,
  updateUserPreference
}

export default connect(
  selector,
  actions
)(SidebarPodcasts)

import React, { useCallback } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import get from 'lodash/get'
import Collapse from '@material-ui/core/Collapse'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import PropTypes from 'prop-types'

import { episodesSelector } from 'redux/modules/media'
import { IconMicrophone } from 'icons'
import { updateUserPreference, userPreferenceSelector } from 'redux/modules/profiles'
import SidebarItem from '../SidebarItem'
import SidebarSubItem from '../SidebarSubItem'
import { FormattedDate } from 'react-intl'

const SidebarEpisodes = ({ className, episodes, open, onToggle, updateUserPreference, userPreference }) => {
  const handleToggle = useCallback(() => onToggle('episodes'), [onToggle])
  const handleClickItem = useCallback(
    episodeId => () => {
      updateUserPreference({
        data: {
          ...userPreference,
          episodeId
        }
      })
      onToggle('episodes')
    },
    [onToggle, updateUserPreference, userPreference]
  )
  const networkId = get(userPreference, 'networkId')
  const podcastId = get(userPreference, 'seriesId')
  const episodesVisible = Boolean(networkId && podcastId)

  return episodesVisible ? (
    <>
      <List className={className}>
        <SidebarItem icon={IconMicrophone} text="Episodes" onClick={handleToggle} hasSubItems open={open} />
        <Collapse in={open} style={{ overflow: 'auto' }}>
          <List component="nav" dense>
            <SidebarSubItem
              text={episodes.length > 0 ? 'All Episodes' : 'No Episodes in this podcast'}
              disabled={episodes.length === 0}
              onClick={handleClickItem(null)}
            />
            {episodes.map(episode => (
              <SidebarSubItem
                text={
                  <>
                    <FormattedDate format="numericDate" value={episode.publishDate} />
                    {' - '}
                    {episode.name}
                  </>
                }
                key={episode.episodeId}
                selected={userPreference.episodeId === episode.episodeId}
                onClick={handleClickItem(episode.episodeId)}
              />
            ))}
          </List>
        </Collapse>
      </List>
      <Divider />
    </>
  ) : null
}

SidebarEpisodes.propTypes = {
  className: PropTypes.string,
  episodes: PropTypes.array,
  onToggle: PropTypes.func.isRequired,
  open: PropTypes.bool,
  updateUserPreference: PropTypes.func.isRequired,
  userPreference: PropTypes.object
}

const selector = createStructuredSelector({
  episodes: episodesSelector,
  userPreference: userPreferenceSelector
})

const actions = {
  updateUserPreference
}

export default connect(
  selector,
  actions
)(SidebarEpisodes)

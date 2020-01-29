import React, { useCallback } from 'react'

import Collapse from '@material-ui/core/Collapse'
import Divider from '@material-ui/core/Divider'
import IconCast from '@material-ui/icons/Cast'
import List from '@material-ui/core/List'
import PropTypes from 'prop-types'
import SidebarItem from '../SidebarItem'
import SidebarSubItem from '../SidebarSubItem'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import get from 'lodash/get'
import sortBy from 'lodash/sortBy'
import { userPreferenceSelector } from 'redux/modules/profiles'
import { userSeriesSelector } from 'redux/modules/profiles'

const SidebarPodcasts = ({ className, text, userSeries, open, onToggle, userPreference }) => {
  const handleToggle = useCallback(() => onToggle('podcasts'), [onToggle])
  const handleClickItem = useCallback(() => onToggle('podcasts'), [onToggle])
  const networkId = get(userPreference, 'networkId')
  const podcasts = sortBy(get(userSeries, networkId) || [], 'name')

  return networkId ? (
    <>
      <List className={className}>
        <SidebarItem icon={IconCast} text={text} onClick={handleToggle} hasSubItems open={open} />
        <Collapse in={open} style={{ overflowX: 'hidden', overflowY: 'auto' }}>
          <List component="nav" dense>
            <SidebarSubItem
              text={podcasts.length > 0 ? 'All Podcasts' : 'No Podcasts in this network'}
              disabled={podcasts.length === 0}
              to={`/${networkId}`}
              onClick={handleClickItem}
            />
            {podcasts.map(podcast => (
              <SidebarSubItem
                text={podcast.name}
                key={podcast.seriesId}
                selected={userPreference.seriesId === podcast.seriesId}
                to={`/${networkId}/${podcast.seriesId}`}
                onClick={handleClickItem}
              />
            ))}
          </List>
        </Collapse>
      </List>
      {text !== '' && <Divider />}
    </>
  ) : null
}

SidebarPodcasts.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
  onToggle: PropTypes.func.isRequired,
  open: PropTypes.bool,
  userPreference: PropTypes.object,
  userSeries: PropTypes.object
}

const selector = createStructuredSelector({
  userSeries: userSeriesSelector,
  userPreference: userPreferenceSelector
})

export default connect(selector)(SidebarPodcasts)

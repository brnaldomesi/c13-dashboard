import React, { useCallback } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import Collapse from '@material-ui/core/Collapse'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import PropTypes from 'prop-types'

import { IconAirplay } from 'icons'
import { networksSelector } from 'redux/modules/media'
import { updateUserPreference, userPreferenceSelector } from 'redux/modules/profiles'
import SidebarItem from '../SidebarItem'
import SidebarSubItem from '../SidebarSubItem'

const SidebarNetworks = ({ networks, open, onToggle, userPreference, updateUserPreference }) => {
  const handleToggle = useCallback(() => onToggle('networks'), [onToggle])
  const handleClickItem = useCallback(
    networkId => () => {
      updateUserPreference({
        data: {
          ...userPreference,
          networkId,
          seriesId: null,
          episodeId: null
        }
      })
      onToggle('networks')
    },
    [onToggle, updateUserPreference, userPreference]
  )

  return (
    <>
      <List>
        <SidebarItem icon={IconAirplay} text="Networks" to="/networks" onClick={handleToggle} hasSubItems open={open} />
        <Collapse in={open}>
          <List component="nav" dense>
            {networks.map(network => (
              <SidebarSubItem
                text={network.name}
                key={network.networkId}
                selected={userPreference.networkId === network.networkId}
                onClick={handleClickItem(network.networkId)}
              />
            ))}
          </List>
        </Collapse>
      </List>
      <Divider />
    </>
  )
}

SidebarNetworks.propTypes = {
  networks: PropTypes.array,
  onToggle: PropTypes.func.isRequired,
  open: PropTypes.bool,
  updateUserPreference: PropTypes.func.isRequired,
  userPreference: PropTypes.object
}

const selector = createStructuredSelector({
  networks: networksSelector,
  userPreference: userPreferenceSelector
})

const actions = {
  updateUserPreference
}

export default connect(
  selector,
  actions
)(SidebarNetworks)

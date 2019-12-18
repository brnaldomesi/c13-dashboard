import React, { useCallback } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import Collapse from '@material-ui/core/Collapse'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import PropTypes from 'prop-types'

import { IconAirplay } from 'icons'
import { networksSelector } from 'redux/modules/media'
import { userPreferenceSelector } from 'redux/modules/profiles'
import SidebarItem from '../SidebarItem'
import SidebarSubItem from '../SidebarSubItem'

const SidebarNetworks = ({ className, networks, open, onToggle, userPreference }) => {
  const handleToggle = useCallback(() => onToggle('networks'), [onToggle])
  const handleClickItem = useCallback(() => onToggle('networks'), [onToggle])

  return (
    <>
      <List className={className}>
        <SidebarItem icon={IconAirplay} text="Networks" onClick={handleToggle} hasSubItems open={open} />
        <Collapse in={open} style={{ overflow: 'auto' }}>
          <List component="nav" dense>
            <SidebarSubItem text="All Networks" to="/" selected={!userPreference.networkId} onClick={handleClickItem} />
            {networks.map(network => (
              <SidebarSubItem
                text={network.name}
                key={network.networkId}
                to={`/${network.networkId}`}
                selected={userPreference.networkId === network.networkId}
                onClick={handleClickItem}
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
  className: PropTypes.string,
  networks: PropTypes.array,
  onToggle: PropTypes.func.isRequired,
  open: PropTypes.bool,
  userPreference: PropTypes.object
}

const selector = createStructuredSelector({
  networks: networksSelector,
  userPreference: userPreferenceSelector
})

export default connect(selector)(SidebarNetworks)

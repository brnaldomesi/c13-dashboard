import React, { useCallback } from 'react'

import Collapse from '@material-ui/core/Collapse'
import Divider from '@material-ui/core/Divider'
import { IconAirplay } from 'icons'
import List from '@material-ui/core/List'
import PropTypes from 'prop-types'
import SidebarItem from '../SidebarItem'
import SidebarSubItem from '../SidebarSubItem'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { networksSelector } from 'redux/modules/media'
import { userPreferenceSelector } from 'redux/modules/profiles'

const SidebarNetworks = ({ className, text, networks, open, onToggle, userPreference }) => {
  const handleToggle = useCallback(() => onToggle('networks'), [onToggle])
  const handleClickItem = useCallback(() => onToggle('networks'), [onToggle])

  return (
    userPreference && (
      <>
        <List className={className}>
          <SidebarItem icon={IconAirplay} text={text} onClick={handleToggle} hasSubItems open={open} />
          <Collapse in={open} style={{ overflowX: 'hidden', overflowY: 'auto' }}>
            <List component="nav" dense>
              <SidebarSubItem
                text="All Networks"
                to="/"
                selected={!userPreference.networkId}
                onClick={handleClickItem}
              />
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
        {text !== '' && <Divider />}
      </>
    )
  )
}

SidebarNetworks.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
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

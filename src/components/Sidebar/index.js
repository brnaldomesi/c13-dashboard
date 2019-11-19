import React, { useCallback, useState } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import IconCast from '@material-ui/icons/Cast'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import LogoutIcon from '@material-ui/icons/PowerSettingsNew'
import MenuIcon from '@material-ui/icons/Menu'
import PropTypes from 'prop-types'

import { authLogout } from 'redux/modules/auth'
import { IconMail, IconMicrophone, IconNotification } from 'icons'
import { userIsAuthenticated } from 'hocs/withAuth'
import Logo from 'components/Logo'
import SidebarItem from './SidebarItem'
import SidebarNetworks from './SidebarNetworks'
import styles from './styles'

const Sidebar = ({ authLogout, classes, open, toggle }) => {
  const [activeSection, setActiveSection] = useState(null)

  const handleToggle = useCallback(() => toggle(!open), [toggle, open])

  const handleSectionToggle = useCallback(
    activeSection => {
      setActiveSection(prevSection => (prevSection === activeSection ? null : activeSection))
    },
    [setActiveSection]
  )

  return (
    <Drawer open={open} onClose={handleToggle} classes={{ paper: classes.paper }}>
      <div className={classes.header}>
        <IconButton color="inherit" onClick={handleToggle} className={classes.menuButton}>
          <MenuIcon />
        </IconButton>
        <Logo />
      </div>
      <div className={classes.list}>
        <List>
          <SidebarItem icon={IconNotification} text="Notifications" to="/notifications" />
        </List>
        <Divider />
        <SidebarNetworks open={activeSection === 'networks'} onToggle={handleSectionToggle} />
        <List>
          <SidebarItem icon={IconCast} text="Podcasts" to="/podcasts" />
        </List>
        <Divider />
        <List>
          <SidebarItem icon={IconMicrophone} text="All Episodes" to="/episodes" />
        </List>
        <Divider />
        <List>
          <SidebarItem icon={IconMail} text="Feedback" to="/feedback" />
        </List>
      </div>
      <div className={classes.footer} onClick={handleToggle} onKeyDown={handleToggle}>
        <SidebarItem icon={LogoutIcon} text="Logout" onClick={authLogout} />
      </div>
    </Drawer>
  )
}

Sidebar.propTypes = {
  authLogout: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired
}

const actions = {
  authLogout
}

export default compose(
  userIsAuthenticated,
  connect(
    null,
    actions
  ),
  withStyles(styles)
)(Sidebar)

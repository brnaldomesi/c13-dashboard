import React, { useCallback, useState } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import cn from 'classnames'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import LogoutIcon from '@material-ui/icons/PowerSettingsNew'
import MenuIcon from '@material-ui/icons/Menu'
import InfoIcon from '@material-ui/icons/Info'
import PropTypes from 'prop-types'

import { authLogout } from 'redux/modules/auth'
import { IconMail, IconNotification } from 'icons'
import { userIsAuthenticated } from 'hocs/withAuth'
import Logo from 'components/Logo'
import SidebarItem from './SidebarItem'
import SidebarEpisodes from './SidebarEpisodes'
import SidebarNetworks from './SidebarNetworks'
import SidebarPodcasts from './SidebarPodcasts'
import styles from './styles'
import { Typography } from '@material-ui/core'

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
      <div className={cn(classes.list, classes.flexOne)}>
        <List>
          <SidebarItem icon={IconNotification} text="Notifications" to="/notifications" />
        </List>
        <Divider />
        <SidebarNetworks open={activeSection === 'networks'} onToggle={handleSectionToggle} className={classes.list} />
        <SidebarPodcasts open={activeSection === 'podcasts'} onToggle={handleSectionToggle} className={classes.list} />
        <SidebarEpisodes open={activeSection === 'episodes'} onToggle={handleSectionToggle} className={classes.list} />
        <List>
          <SidebarItem icon={IconMail} text="Feedback" to="/feedback" />
        </List>
        <Divider />
        <Typography variant="caption" className={classes.info}>
          * Unless otherwise stated with <InfoIcon fontSize="inherit" />, all data is based on selected date range.
          <br />* Spotify data available as of 10.24.18
        </Typography>
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

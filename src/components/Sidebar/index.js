import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import IconCast from '@material-ui/icons/Cast'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import LogoutIcon from '@material-ui/icons/PowerSettingsNew'
import MenuIcon from '@material-ui/icons/Menu'
import PropTypes from 'prop-types'

import { authLogout } from 'redux/modules/auth'
import { IconAirplay, IconMail, IconMicrophone, IconNotification } from 'icons'
import { userIsAuthenticated } from 'hocs/withAuth'
import Logo from 'components/Logo'
import styles from './styles'

const SidebarItem = ({ icon, text, to, onClick }) => {
  const Icon = icon
  return (
    <ListItem button component={to ? Link : undefined} to={to} onClick={onClick}>
      <ListItemIcon>
        <Icon />
      </ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  )
}

const Sidebar = ({ authLogout, classes, open, toggle }) => {
  const handleToggle = () => toggle(!open)
  const sideList = (
    <div className={classes.list}>
      <List>
        <SidebarItem icon={IconNotification} text="Notifications" to="/notifications" />
      </List>
      <Divider />
      <List>
        <SidebarItem icon={IconAirplay} text="Networks" to="/networks" />
      </List>
      <Divider />
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
  )

  return (
    <Drawer open={open} onClose={handleToggle} classes={{ paper: classes.paper }}>
      <div className={classes.header}>
        <IconButton color="inherit" onClick={handleToggle} className={classes.menuButton}>
          <MenuIcon />
        </IconButton>
        <Logo />
      </div>
      <div tabIndex={0} role="button" onClick={handleToggle} onKeyDown={handleToggle}>
        {sideList}
      </div>
      <div className={classes.spacer} />
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

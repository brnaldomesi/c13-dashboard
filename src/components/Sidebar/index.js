import { IconCollapse, IconExpand, IconMail, IconNotification } from 'icons'
import React, { useCallback, useState } from 'react'

import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import InfoIcon from '@material-ui/icons/Info'
import List from '@material-ui/core/List'
import Logo from 'components/Logo'
import LogoutIcon from '@material-ui/icons/PowerSettingsNew'
import MenuIcon from '@material-ui/icons/Menu'
import PropTypes from 'prop-types'
import SidebarEpisodes from './SidebarEpisodes'
import SidebarItem from './SidebarItem'
import SidebarNetworks from './SidebarNetworks'
import SidebarNotifications from './SidebarNotifications'
import SidebarPodcasts from './SidebarPodcasts'
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount'
import { Typography } from '@material-ui/core'
import { authLogout } from 'redux/modules/auth'
import cn from 'classnames'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { makeStyles } from '@material-ui/core/styles'
import { profileSelector } from 'redux/modules/auth'
import styles from './styles'
import { userIsAuthenticated } from 'hocs/withAuth'

const useStyles = makeStyles(styles)

const Sidebar = ({ authLogout, open, toggle, profile, matchsXs }) => {
  const [activeSection, setActiveSection] = useState(null)
  const handleToggle = useCallback(() => {
    if (open) {
      setActiveSection(prevSection => null)
    }
    toggle(!open)
  }, [toggle, open, setActiveSection])
  const expandSideBar = useCallback(() => toggle(true), [toggle])
  const handleSectionToggle = useCallback(
    activeSection => {
      toggle(true)
      setActiveSection(prevSection => {
        if (prevSection === activeSection) {
          if (activeSection === 'networks') {
            return 'podcasts'
          } else if (activeSection === 'podcasts') {
            return 'episodes'
          } else {
            return null
          }
        } else {
          return activeSection
        }
      })
    },
    [toggle, setActiveSection]
  )
  const [sidebarItemheight, setSidebarItemheight] = useState(0)
  const measuredRef = useCallback(node => {
    if (node !== null) {
      setSidebarItemheight(node.getBoundingClientRect().height)
    }
  }, [])
  const classes = useStyles({ open: open, sidebarItemheight: sidebarItemheight })

  const renderMenu = () => {
    return (
      <>
        <div className={classes.header}>
          {matchsXs && (
            <>
              <IconButton color="inherit" onClick={handleToggle} className={classes.menuButton}>
                <MenuIcon />
              </IconButton>
              <Logo />
            </>
          )}
        </div>
        <div className={cn(classes.list, classes.flexOne)}>
          {open && !matchsXs ? (
            <IconCollapse onClick={handleToggle} className={classes.sidebarToggle} style={{ color: 'black' }} />
          ) : !open && !matchsXs ? (
            <IconExpand onClick={handleToggle} className={classes.sidebarToggle} style={{ color: 'black' }} />
          ) : (
            undefined
          )}

          <List className={classes.clearfix} ref={measuredRef}>
            <SidebarNotifications
              icon={IconNotification}
              text={open ? 'Notifications' : ''}
              onClick={expandSideBar}
              open={open}
            />
          </List>
          {open && <Divider />}
          <SidebarNetworks
            open={activeSection === 'networks'}
            text={open ? 'Networks' : ''}
            onToggle={handleSectionToggle}
            className={classes.list}
            onClick={expandSideBar}
          />
          <SidebarPodcasts
            open={activeSection === 'podcasts'}
            text={open ? 'Podcasts' : ''}
            onToggle={handleSectionToggle}
            className={classes.list}
          />
          <SidebarEpisodes
            open={activeSection === 'episodes'}
            text={open ? 'All Episodes' : ''}
            onToggle={handleSectionToggle}
            className={classes.list}
          />
          <List>
            <SidebarItem
              icon={IconMail}
              text={open ? 'Feedback' : ''}
              href="mailto:feedback@cadence13.com"
              onClick={expandSideBar}
            />
          </List>
          {open && <Divider />}
          {profile.role === 'ADMIN' && (
            <List>
              <SidebarItem
                icon={SupervisorAccountIcon}
                text={open ? 'Admin Control' : ''}
                to="/users"
                onClick={expandSideBar}
              />
            </List>
          )}
          {open && (
            <>
              <Divider />
              <Typography variant="caption" className={classes.info}>
                * Unless otherwise stated with <InfoIcon fontSize="inherit" />, all data is based on selected date
                range.
              </Typography>
            </>
          )}
        </div>
        <div className={classes.footer} onKeyDown={handleToggle}>
          <SidebarItem icon={LogoutIcon} text={open ? 'Logout' : ''} onClick={() => authLogout()} />
        </div>
      </>
    )
  }

  return (
    <>
      {matchsXs ? (
        <Drawer open={open} onClose={handleToggle} classes={{ paper: classes.paper }}>
          {renderMenu()}
        </Drawer>
      ) : (
        <div className={classes.root}>{renderMenu()}</div>
      )}
    </>
  )
}

Sidebar.propTypes = {
  authLogout: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  matchsXs: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired
}

const actions = {
  authLogout
}

const selector = createStructuredSelector({
  profile: profileSelector
})

export default compose(userIsAuthenticated, connect(selector, actions))(Sidebar)

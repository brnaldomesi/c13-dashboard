import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { withStyles } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import PropTypes from 'prop-types'
import Toolbar from '@material-ui/core/Toolbar'

// import HeaderSearchForm from 'components/HeaderSearchForm'
import Logo from 'components/Logo'
import styles from './styles'
import { isAuthenticatedSelector } from 'redux/modules/auth'

export const Header = ({ classes, isAuthenticated, toggleSidebar }) => (
  <AppBar position="fixed" color="default" className={classes.root}>
    <Toolbar disableGutters>
      {isAuthenticated ? (
        <IconButton color="inherit" onClick={() => toggleSidebar(true)} className={classes.menuButton}>
          <MenuIcon />
        </IconButton>
      ) : (
        <div className={classes.menuButton} />
      )}
      <Logo />
      {isAuthenticated && (
        <>
          {/* <HeaderSearchForm /> */}
          <div className={classes.spacer} />
        </>
      )}
    </Toolbar>
  </AppBar>
)

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool,
  toggleSidebar: PropTypes.func.isRequired
}

const selector = createStructuredSelector({
  isAuthenticated: isAuthenticatedSelector
})

export default compose(
  connect(selector),
  withStyles(styles)
)(Header)

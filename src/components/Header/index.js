import AppBar from '@material-ui/core/AppBar'
import DatePreferences from 'components/DatePreferences'
import Logo from 'components/Logo'
import PropTypes from 'prop-types'
import React from 'react'
import Toolbar from '@material-ui/core/Toolbar'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { isAuthenticatedSelector } from 'redux/modules/auth'
import styles from './styles'
import { withStyles } from '@material-ui/core'

export const Header = ({ classes, isAuthenticated }) => (
  <AppBar position="fixed" color="default" className={classes.root}>
    <Toolbar disableGutters>
      <div className={classes.menuButton} />
      <Logo />
      {isAuthenticated && (
        <>
          {/* <HeaderSearchForm /> */}
          <div className={classes.spacer} />
          <DatePreferences />
        </>
      )}
    </Toolbar>
  </AppBar>
)

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool
}

const selector = createStructuredSelector({
  isAuthenticated: isAuthenticatedSelector
})

export default compose(
  connect(selector),
  withStyles(styles)
)(Header)

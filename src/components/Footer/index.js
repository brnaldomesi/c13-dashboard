import { Link } from 'react-router-dom'
import Logo from 'components/Logo'
import PropTypes from 'prop-types'
import React from 'react'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import cn from 'classnames'
import { compose } from 'redux'
import styles from './styles'
import { withStyles } from '@material-ui/core'

export const Footer = ({ classes }) => (
  <Toolbar disableGutters className={classes.root}>
    <div className={classes.menuButton} />
    <Logo />
    <div className={classes.linksGroup}>
      <Typography align="center">CONTACT US</Typography>
      <Typography align="center">
        <a href="mailto:test@example.com" className={cn(classes.link, classes.mainColor)}>
          analytics@cadence13.com
        </a>
      </Typography>
      <Typography align="center">
        <a target="_blank" href="https://entercom.com/terms-and-conditions" className={classes.link}>
          TOS
        </a>
      </Typography>
      <Typography align="center">
        <a target="_blank" href="https://entercom.com/terms-and-conditions" className={classes.link}>
          Privacy Policy
        </a>
      </Typography>
    </div>
  </Toolbar>
)

Footer.propTypes = {
  classes: PropTypes.object
}

export default compose(withStyles(styles))(Footer)

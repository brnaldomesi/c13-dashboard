import { Link } from '@material-ui/core'
import Logo from 'components/Logo'
import PropTypes from 'prop-types'
import React from 'react'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { compose } from 'redux'
import styles from './styles'
import { withStyles } from '@material-ui/core'

export const Footer = ({ classes }) => (
  <Toolbar disableGutters className={classes.root}>
    <div className={classes.menuButton} />
    <div className={classes.footerLogo}>
      <Logo />
    </div>
    <div className={classes.linksGroup}>
      <Typography align="center">CONTACT US</Typography>
      <Link href="mailto:test@example.com">
        <Typography align="center">analytics@cadence13.com</Typography>
      </Link>
      <Link href="https://entercom.com/terms-and-conditions" rel="noopener" target="_blank" className={classes.link}>
        <Typography align="center">TOS</Typography>
      </Link>
      <Link href="https://entercom.com/privacy-policy" rel="noopener" target="_blank" className={classes.link}>
        <Typography align="center">Privacy Policy</Typography>
      </Link>
    </div>
  </Toolbar>
)

Footer.propTypes = {
  classes: PropTypes.object
}

export default compose(withStyles(styles))(Footer)

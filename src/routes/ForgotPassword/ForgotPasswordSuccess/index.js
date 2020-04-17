import React, { useEffect } from 'react'

import Cookies from 'js-cookie'
import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import styles from '../../Login/styles'
import { withStyles } from '@material-ui/core/styles'

const ForgotPasswordSuccess = ({ classes, history }) => {
  useEffect(() => {
    const success = Cookies.get('cadence13_forgotPassword_success')
    if (success) {
      Cookies.set('cadence13_forgotPassword_success', 0)
    }
    if (!+success) {
      history.push('/login')
    }
  }, [history])

  return (
    <Paper className={classes.paper}>
      <Typography variant="h6" align="center" gutterBottom>
        Forgot Password
      </Typography>
      <Typography>Please check your e-mail. We sent a link to:</Typography>
      <Typography color="primary">{history.location.state && history.location.state.email}</Typography>
    </Paper>
  )
}

ForgotPasswordSuccess.propTypes = {
  classes: PropTypes.object
}

export default withStyles(styles)(ForgotPasswordSuccess)

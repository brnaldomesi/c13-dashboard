import React, { useEffect } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

import { isAuthenticatedOrRedir } from 'hocs/withAuth'
import { getNetworks } from 'redux/modules/media'
import { getUserPreference } from 'redux/modules/profiles'
import styles from './styles'
import Typography from '@material-ui/core/Typography'

const Dashboard = ({ classes, getNetworks, getUserPreference }) => {
  useEffect(() => {
    getNetworks()
  }, [getNetworks])

  useEffect(() => {
    getUserPreference()
  }, [getUserPreference])

  return (
    <div className={classes.root}>
      <Typography variant="h4">Welcome to Cadence Dashboard!</Typography>
    </div>
  )
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  getUserPreference: PropTypes.func.isRequired
}

const actions = {
  getNetworks,
  getUserPreference
}

export default compose(
  isAuthenticatedOrRedir,
  connect(
    null,
    actions
  ),
  withStyles(styles)
)(Dashboard)

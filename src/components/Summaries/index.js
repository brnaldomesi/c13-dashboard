import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { FormattedDate, FormattedNumber } from 'react-intl'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'

import { getSummaries, summariesLoadingSelector, summariesSelector } from 'redux/modules/metrics'
import { userPreferenceSelector } from 'redux/modules/profiles'
import LoadingIndicator from 'components/LoadingIndicator'
import Panel from 'components/Panel'
import styles from './styles'

const useStyles = makeStyles(styles)

const Summaries = ({ getSummaries, loading, summaries, userPreference }) => {
  const classes = useStyles()
  useEffect(() => {
    if (userPreference) {
      getSummaries()
    }
  }, [getSummaries, userPreference])

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Panel>
            <Panel.Header
              title="Downloads"
              action={
                userPreference ? (
                  <>
                    <FormattedDate format="dayAndMonth" value={userPreference.fromDate} />
                    {' - '}
                    <FormattedDate format="dayAndMonth" value={userPreference.toDate} />
                  </>
                ) : null
              }
            />
            <Panel.Content>
              <Typography variant="h3" component="div" color="primary" align="center">
                {summaries ? (
                  <FormattedNumber value={summaries.dateRangeDownloads} format="decimal" />
                ) : (
                  <LoadingIndicator isStatic size={32} />
                )}
              </Typography>
            </Panel.Content>
          </Panel>
        </Grid>
        <Grid item xs={4}>
          <Panel>
            <Panel.Header title="Avg Weekly Downloads" />
            <Panel.Content>
              <Typography variant="h3" component="div" color="primary" align="center">
                {summaries ? (
                  <FormattedNumber value={summaries.averageDateRangeIntervalDownloads} format="decimal" />
                ) : (
                  <LoadingIndicator isStatic size={32} />
                )}
              </Typography>
            </Panel.Content>
          </Panel>
        </Grid>
        <Grid item xs={4}>
          <Panel>
            <Panel.Header title="Lifetime Downloads" />
            <Panel.Content>
              <Typography variant="h3" component="div" color="primary" align="center">
                {summaries ? (
                  <FormattedNumber value={summaries.lifetimeDownloads} format="decimal" />
                ) : (
                  <LoadingIndicator isStatic size={32} />
                )}
              </Typography>
            </Panel.Content>
          </Panel>
        </Grid>
      </Grid>
    </div>
  )
}

Summaries.propTypes = {
  userPreference: PropTypes.object,
  getSummaries: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  summaries: PropTypes.object
}

const selector = createStructuredSelector({
  loading: summariesLoadingSelector,
  summaries: summariesSelector,
  userPreference: userPreferenceSelector
})

const actions = {
  getSummaries
}

export default connect(
  selector,
  actions
)(Summaries)

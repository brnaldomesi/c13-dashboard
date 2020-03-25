import { FormattedDate, FormattedNumber } from 'react-intl'
import React, { useEffect } from 'react'
import { getSummaries, summariesLoadingSelector, summariesSelector } from 'redux/modules/metrics'

import Grid from '@material-ui/core/Grid'
import LoadingIndicator from 'components/LoadingIndicator'
import Panel from 'components/Panel'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { makeStyles } from '@material-ui/core/styles'
import styles from './styles'
import { userPreferenceSelector } from 'redux/modules/profiles'

const useStyles = makeStyles(styles)

const Summaries = ({ getSummaries, loading, summaries, userPreference, minimized }) => {
  const classes = useStyles()
  useEffect(() => {
    if (userPreference) {
      getSummaries()
    }
  }, [getSummaries, userPreference])

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Panel>
            {minimized ? (
              <Panel.Header
                title="Downloads"
                action={
                  <Typography variant="subtitle1" className={classes.subtitle1}>
                    {summaries ? (
                      <FormattedNumber value={summaries.dateRangeDownloads} format="decimal" />
                    ) : loading ? (
                      <LoadingIndicator isStatic size={32} />
                    ) : (
                      'No data available'
                    )}
                  </Typography>
                }
              />
            ) : (
              <Panel.Header
                title="Downloads"
                action={
                  userPreference ? (
                    <Typography variant="subtitle1" className={classes.subtitle1}>
                      <FormattedDate format="dayAndMonth" value={userPreference.fromDate} />
                      {' - '}
                      <FormattedDate format="dayAndMonth" value={userPreference.toDate} />
                    </Typography>
                  ) : null
                }
              />
            )}
            {minimized ? null : (
              <Panel.Content>
                {summaries ? (
                  <Typography variant="h3" component="div" color="primary" align="center">
                    <FormattedNumber value={summaries.dateRangeDownloads} format="decimal" />
                  </Typography>
                ) : loading ? (
                  <Typography align="center" component="div">
                    <LoadingIndicator isStatic size={32} />
                  </Typography>
                ) : (
                  <Typography variant="body1" component="div" align="center">
                    No data available
                  </Typography>
                )}
              </Panel.Content>
            )}
          </Panel>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Panel>
            {minimized ? (
              <Panel.Header
                title="Avg Weekly Downloads"
                action={
                  <Typography variant="subtitle1" className={classes.subtitle1}>
                    {summaries ? (
                      <FormattedNumber value={summaries.averageDateRangeIntervalDownloads} format="decimal" />
                    ) : loading ? (
                      <LoadingIndicator isStatic size={32} />
                    ) : (
                      'No data available'
                    )}
                  </Typography>
                }
              />
            ) : (
              <Panel.Header title="Avg Weekly Downloads" />
            )}

            {minimized ? null : (
              <Panel.Content>
                {summaries ? (
                  <Typography variant="h3" component="div" color="primary" align="center">
                    <FormattedNumber value={summaries.averageDateRangeIntervalDownloads} format="decimal" />
                  </Typography>
                ) : loading ? (
                  <Typography align="center" component="div">
                    <LoadingIndicator isStatic size={32} />
                  </Typography>
                ) : (
                  <Typography variant="body1" component="div" align="center">
                    No data available
                  </Typography>
                )}
              </Panel.Content>
            )}
          </Panel>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Panel>
            {minimized ? (
              <Panel.Header
                title="Lifetime Downloads"
                action={
                  <Typography variant="subtitle1" className={classes.subtitle1}>
                    {summaries ? (
                      <FormattedNumber value={summaries.lifetimeDownloads} format="decimal" />
                    ) : loading ? (
                      <LoadingIndicator isStatic size={32} />
                    ) : (
                      'No data available'
                    )}
                  </Typography>
                }
              />
            ) : (
              <Panel.Header title="Lifetime Downloads" />
            )}

            {minimized ? null : (
              <Panel.Content>
                {summaries ? (
                  <Typography variant="h3" component="div" color="primary" align="center">
                    <FormattedNumber value={summaries.lifetimeDownloads} format="decimal" />
                  </Typography>
                ) : loading ? (
                  <Typography align="center" component="div">
                    <LoadingIndicator isStatic size={32} />
                  </Typography>
                ) : (
                  <Typography variant="body1" component="div" align="center">
                    No data available
                  </Typography>
                )}
              </Panel.Content>
            )}
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
  summaries: PropTypes.object,
  minimized: PropTypes.bool
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

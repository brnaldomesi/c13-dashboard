import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

import { getTotalsAndTrends, totalsAndTrendsLoadingSelector, totalsAndTrendsSelector } from 'redux/modules/metrics'
import { userPreferenceSelector } from 'redux/modules/profiles'
import styles from './styles'
import TotalsPanel from 'components/TotalsPanel'

const useStyles = makeStyles(styles)

const TotalAndHourly = ({ getTotalsAndTrends, loading, totalsAndTrends, userPreference }) => {
  const classes = useStyles()
  useEffect(() => {
    if (userPreference) {
      getTotalsAndTrends()
    }
  }, [getTotalsAndTrends, userPreference])

  return (
    <div className={classes.root}>
      <TotalsPanel totals={totalsAndTrends} loading={loading} />
    </div>
  )
}

TotalAndHourly.propTypes = {
  userPreference: PropTypes.object,
  getTotalsAndTrends: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  totalsAndTrends: PropTypes.object
}

const selector = createStructuredSelector({
  loading: totalsAndTrendsLoadingSelector,
  totalsAndTrends: totalsAndTrendsSelector,
  userPreference: userPreferenceSelector
})

const actions = {
  getTotalsAndTrends
}

export default connect(
  selector,
  actions
)(TotalAndHourly)

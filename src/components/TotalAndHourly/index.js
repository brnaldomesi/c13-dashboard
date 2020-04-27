import React, { useCallback, useEffect, useState } from 'react'
import {
  getLast48Hours,
  getLast48HoursLoadingSelector,
  getLast48HoursSelector,
  getTotalsAndTrends,
  totalsAndTrendsLoadingSelector,
  totalsAndTrendsSelector
} from 'redux/modules/metrics'

import Button from '@material-ui/core/Button'
import HourlyPanel from 'components/HourlyPanel'
import IconExport from 'icons/IconExport'
import LoadingIndicator from 'components/LoadingIndicator'
import Panel from 'components/Panel'
import PropTypes from 'prop-types'
import Tabs from 'components/Tabs'
import TotalsPanel from 'components/TotalsPanel'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { downloadCSV } from 'utils/exporting'
import fp from 'lodash/fp'
import { getESTDateStr } from 'utils/helpers'
import { makeStyles } from '@material-ui/core/styles'
import styles from './styles'
import { userPreferenceSelector } from 'redux/modules/profiles'

const useStyles = makeStyles(styles)

const tabs = [{ label: 'Total', key: 'total' }, { label: 'Hourly', key: 'hourly' }]

const renderTab = (tab, totalsAndTrends, last48Hours) => {
  switch (tab) {
    case 'total':
      return <TotalsPanel totals={totalsAndTrends} />
    case 'hourly':
      return <HourlyPanel last48Hours={last48Hours} />
    default:
      return null
  }
}

const csvHeader = 'Week,Listens'

const TotalAndHourly = ({
  getTotalsAndTrends,
  getLast48Hours,
  totalLoading,
  hourlyLoading,
  totalsAndTrends,
  userPreference,
  last48Hours
}) => {
  const classes = useStyles()
  const [activeTab, setActiveTab] = useState(tabs[0].key)
  useEffect(() => {
    if (userPreference) {
      getTotalsAndTrends()
      getLast48Hours()
    }
  }, [getTotalsAndTrends, userPreference, getLast48Hours])

  const getCSVData = fp.compose(
    fp.join('\n'),
    items => [csvHeader, ...items],
    fp.map(item =>
      [
        activeTab === tabs[0].key
          ? getESTDateStr(item.date, 'ddd MMM D YYYY')
          : getESTDateStr(item.date, 'ddd MMM D YYYY h a'),
        item.count
      ].join(',')
    ),
    fp.defaultTo([]),
    fp.get('chartData')
  )

  const handleExport = useCallback(() => {
    const csv = activeTab === tabs[0].key ? getCSVData(totalsAndTrends) : getCSVData({ chartData: last48Hours })
    activeTab === tabs[0].key
      ? downloadCSV(csv, 'totalDownloadsChartData.csv')
      : downloadCSV(csv, 'last48HoursChartData.csv')
  }, [totalsAndTrends, last48Hours, activeTab, getCSVData])

  return (
    <Panel className={classes.root}>
      <Tabs tabs={tabs} activeKey={activeTab} onChange={setActiveTab} />
      <div className={classes.exportRoot}>
        <div className={classes.exportWrap}>
          <Button className={classes.export} startIcon={<IconExport />} onClick={handleExport}>
            Export
          </Button>
        </div>
      </div>
      <div className={classes.contentInner}>
        {totalLoading || hourlyLoading ? (
          <div className={classes.center}>
            <LoadingIndicator isStatic size={32} />
          </div>
        ) : (
          renderTab(activeTab, totalsAndTrends, last48Hours)
        )}
      </div>
    </Panel>
  )
}

TotalAndHourly.propTypes = {
  userPreference: PropTypes.object,
  getTotalsAndTrends: PropTypes.func.isRequired,
  getLast48Hours: PropTypes.func.isRequired,
  totalLoading: PropTypes.bool,
  hourlyLoading: PropTypes.bool,
  totalsAndTrends: PropTypes.object,
  last48Hours: PropTypes.array
}

const selector = createStructuredSelector({
  totalLoading: totalsAndTrendsLoadingSelector,
  totalsAndTrends: totalsAndTrendsSelector,
  userPreference: userPreferenceSelector,
  last48Hours: getLast48HoursSelector,
  hourlyLoading: getLast48HoursLoadingSelector
})

const actions = {
  getTotalsAndTrends,
  getLast48Hours
}

export default connect(
  selector,
  actions
)(TotalAndHourly)

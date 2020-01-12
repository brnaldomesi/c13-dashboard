import React, { useCallback, useState } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { makeStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import PropTypes from 'prop-types'
import Tooltip from '@material-ui/core/Tooltip'

import { downloadsByMarketSelector, downloadsByMarketLoadingSelector } from 'redux/modules/metrics'
import DownloadsTabContent from './DownloadsTabContent'
import IconArrowDropDown from '@material-ui/icons/ArrowDropDown'
import IconArrowDropUp from '@material-ui/icons/ArrowDropUp'
import IconInfo from 'icons/IconInfo'
import LoadingIndicator from 'components/LoadingIndicator'
import Panel from 'components/Panel'
import styles from './styles'
import Tabs from 'components/Tabs'

const useStyles = makeStyles(styles)

const tabs = [{ label: 'United States', key: 'us' }, { label: 'Global', key: 'global' }]

const DownloadsByMarket = ({ downloadsByMarket, loading }) => {
  const classes = useStyles()
  const [activeTab, setActiveTab] = useState(tabs[0].key)
  const [viewMore, setViewMore] = useState(false)
  const handleToggleViewMore = useCallback(() => {
    setViewMore(viewMore => !viewMore)
  }, [setViewMore])

  return (
    <Panel className={classes.root}>
      <Panel.Header
        title={
          <>
            Market Trends{' '}
            <Tooltip
              title="Numbers below are totals and percentages of overall downloads per market for the selected date range"
              placement="right">
              <IconButton className={classes.iconButton}>
                <IconInfo className={classes.icon} />
              </IconButton>
            </Tooltip>
          </>
        }
      />
      <Panel.Content className={classes.content}>
        <Tabs tabs={tabs} activeKey={activeTab} onChange={setActiveTab} />
        <div className={classes.contentInner}>
          {loading ? (
            <div className={classes.center}>
              <LoadingIndicator isStatic size={32} />
            </div>
          ) : downloadsByMarket ? (
            <DownloadsTabContent
              tabKey={activeTab}
              marketTotals={downloadsByMarket[`${activeTab}MarketTotals`]}
              chartTotals={downloadsByMarket[`${activeTab}ChartTotals`]}
              viewMore={viewMore}
            />
          ) : null}
        </div>
      </Panel.Content>
      <Panel.Footer>
        <Button onClick={handleToggleViewMore} className={classes.moreToggle}>
          View {viewMore ? 'less' : 'more'} {viewMore ? <IconArrowDropUp /> : <IconArrowDropDown />}
        </Button>
      </Panel.Footer>
    </Panel>
  )
}

DownloadsByMarket.propTypes = {
  history: PropTypes.object.isRequired,
  downloadsByMarket: PropTypes.object,
  loading: PropTypes.bool
}

const selector = createStructuredSelector({
  downloadsByMarket: downloadsByMarketSelector,
  loading: downloadsByMarketLoadingSelector
})

export default compose(
  withRouter,
  connect(selector)
)(DownloadsByMarket)

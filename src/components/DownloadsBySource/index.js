import React, { useState } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { makeStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import PropTypes from 'prop-types'
import Tooltip from '@material-ui/core/Tooltip'

import { downloadsBySourceSelector, downloadsBySourceLoadingSelector } from 'redux/modules/metrics'
import DownloadsTotal from './DownloadsTotal'
import IconInfo from 'icons/IconInfo'
import LoadingIndicator from 'components/LoadingIndicator'
import Panel from 'components/Panel'
import styles from './styles'
import Tabs from 'components/Tabs'

const useStyles = makeStyles(styles)

const tabs = [
  { label: 'Total', key: 'total' },
  { label: 'Percentage', key: 'percentage' },
  { label: 'Breakdown', key: 'breakdown' }
]

const DownloadsBySource = ({ history, downloadsBySource, loading }) => {
  const classes = useStyles()
  const [activeTab, setActiveTab] = useState(tabs[0].key)

  return (
    <Panel className={classes.root}>
      <Panel.Header
        title={
          <>
            Downloads By Source{' '}
            <Tooltip title="Performance graph based on change from past 6 weeks average" placement="top">
              <IconButton className={classes.iconButton}>
                <IconInfo className={classes.icon} />
              </IconButton>
            </Tooltip>
          </>
        }
        helperText="*Spotify data available as of 10.24.18"
      />
      <Panel.Content className={classes.content}>
        <Tabs tabs={tabs} activeKey={activeTab} onChange={setActiveTab} />
        <div className={classes.contentInner}>
          {loading ? (
            <div className={classes.center}>
              <LoadingIndicator isStatic size={32} />
            </div>
          ) : downloadsBySource ? (
            <DownloadsTotal sourceData={downloadsBySource.sourceData} />
          ) : null}
        </div>
      </Panel.Content>
    </Panel>
  )
}

DownloadsBySource.propTypes = {
  history: PropTypes.object.isRequired,
  downloadsBySource: PropTypes.object,
  loading: PropTypes.bool
}

const selector = createStructuredSelector({
  downloadsBySource: downloadsBySourceSelector,
  loading: downloadsBySourceLoadingSelector
})

export default compose(
  withRouter,
  connect(selector)
)(DownloadsBySource)

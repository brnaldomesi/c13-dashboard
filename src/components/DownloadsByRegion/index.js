import { downloadsByRegionLoadingSelector, downloadsByRegionSelector } from 'redux/modules/metrics'

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import LoadingIndicator from 'components/LoadingIndicator'
import Panel from 'components/Panel'
import PropTypes from 'prop-types'
import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import fp from 'lodash/fp'
import highchartsMap from 'highcharts/modules/map'
import { makeStyles } from '@material-ui/core/styles'
import mapData from '@highcharts/map-collection/custom/world.geo.json'
import proj4 from 'proj4'
import styles from './styles'
import theme from 'config/theme'
import { withRouter } from 'react-router-dom'

highchartsMap(Highcharts)

const useStyles = makeStyles(styles)
const mapOptions = {
  chart: {
    backgroundColor: 'transparent',
    height: 600,
    map: 'custom/world'
  },

  title: {
    text: null
  },

  credits: {
    enabled: false
  },

  mapNavigation: {
    enabled: true
  },

  colorAxis: {
    type: 'logarithmic'
  },

  legend: {
    layout: 'horizontal',
    align: 'right',
    verticalAlign: 'top'
  },

  series: [
    {
      mapData: mapData,
      joinBy: ['name', 'name'],
      name: 'Downloads',
      states: {
        hover: {
          color: theme.cadence.mapHover
        }
      }
    }
  ]
}

const DownloadsByRegion = ({ downloadsByRegion, loading }) => {
  const classes = useStyles()

  if (typeof window !== 'undefined') {
    window.proj4 = window.proj4 || proj4
  }

  const refinedDownloadsByRegion =
    downloadsByRegion && downloadsByRegion.map(e => ({ name: e.regionName, value: e.downloads }))
  const minDownloadsCount =
    downloadsByRegion &&
    Math.min.apply(
      Math,
      downloadsByRegion.map(({ downloads }) => downloads)
    )
  const maxDownloadsCount =
    downloadsByRegion &&
    Math.max.apply(
      Math,
      downloadsByRegion.map(({ downloads }) => downloads)
    )

  const options = fp.compose(
    fp.set('colorAxis.max', maxDownloadsCount),
    fp.set('colorAxis.min', minDownloadsCount),
    fp.set('series[0].data', refinedDownloadsByRegion)
  )(mapOptions)

  return (
    <Panel className={classes.root}>
      <Panel.Header title={<>Downloads by Region </>} />
      <Panel.Content className={classes.content}>
        {loading ? (
          <div className={classes.center}>
            <LoadingIndicator isStatic size={32} />
          </div>
        ) : downloadsByRegion ? (
          <HighchartsReact constructorType={'mapChart'} highcharts={Highcharts} options={options} />
        ) : null}
      </Panel.Content>
    </Panel>
  )
}

DownloadsByRegion.propTypes = {
  history: PropTypes.object.isRequired,
  downloadsByRegion: PropTypes.array,
  loading: PropTypes.bool
}

const selector = createStructuredSelector({
  downloadsByRegion: downloadsByRegionSelector,
  loading: downloadsByRegionLoadingSelector
})

export default compose(withRouter, connect(selector))(DownloadsByRegion)

import React, { useMemo } from 'react'
import { downloadsByRegionLoadingSelector, downloadsByRegionSelector } from 'redux/modules/metrics'

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import LoadingIndicator from 'components/LoadingIndicator'
import Panel from 'components/Panel'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { countryMatchArray } from './helpers'
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
const getOptions = chartsData => {
  const data = chartsData.map(item => {
    const transformedName = countryMatchArray[item.regionName]

    return {
      name: transformedName ? transformedName : item.regionName,
      value: item.downloads
    }
  })

  console.log('xx', data)

  return {
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
      min: Math.min.apply(
        Math,
        chartsData.map(({ downloads }) => downloads)
      ),
      max: Math.max.apply(
        Math,
        chartsData.map(({ downloads }) => downloads)
      ),
      type: 'logarithmic'
    },

    legend: {
      layout: 'horizontal',
      align: 'right',
      verticalAlign: 'top'
    },

    series: [
      {
        data: data,
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
}

const DownloadsByRegion = ({ chartsData, loading }) => {
  const classes = useStyles()
  const options = useMemo(() => chartsData && getOptions(chartsData), [chartsData])

  return (
    <Panel className={classes.root}>
      <Panel.Header title={<>Downloads by Region </>} />
      <Panel.Content className={classes.content}>
        {loading ? (
          <div className={classes.center}>
            <LoadingIndicator isStatic size={32} />
          </div>
        ) : chartsData ? (
          <HighchartsReact constructorType={'mapChart'} highcharts={Highcharts} options={options} />
        ) : null}
      </Panel.Content>
    </Panel>
  )
}

DownloadsByRegion.propTypes = {
  history: PropTypes.object.isRequired,
  chartsData: PropTypes.array,
  loading: PropTypes.bool
}

const selector = createStructuredSelector({
  chartsData: downloadsByRegionSelector,
  loading: downloadsByRegionLoadingSelector
})

export default compose(withRouter, connect(selector))(DownloadsByRegion)

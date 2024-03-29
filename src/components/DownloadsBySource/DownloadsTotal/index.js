import * as Highcharts from 'highcharts'

import {
  highlightLegendItemByLegend,
  highlightLegendItemBySeriesMouseHover,
  highlightLegendItemBySeriesMouseOut
} from 'utils/highcharts'

import HighchartsReact from 'highcharts-react-official'
import PropTypes from 'prop-types'
import React from 'react'
import { getDownloadsTotalData } from '../helpers'
import { getUTCDateStr } from 'utils/helpers'
import { makeStyles } from '@material-ui/core/styles'
import styles from './styles'
import theme from 'config/theme'

const useStyles = makeStyles(styles)
const getOptions = totalData => ({
  chart: {
    type: 'column',
    backgroundColor: 'transparent',
    style: {
      fontFamily: 'Roboto'
    }
  },
  title: false,
  xAxis: {
    margin: 0,
    color: 'rgba(255, 255, 255, .2)',
    tickColor: 'rgba(255, 255, 255, .2)',
    labels: {
      style: {
        color: theme.palette.text.primary
      }
    },
    categories: totalData.data.map(item => {
      return getUTCDateStr(item.date, 'M/D/YY')
    })
  },
  yAxis: {
    title: false,
    gridLineWidth: 1,
    color: 'rgba(255, 255, 255, .2)',
    lineColor: theme.palette.text.secondary,
    gridLineColor: 'rgba(255, 255, 255, .2)',
    tickColor: 'rgba(255, 255, 255, .2)',
    min: 0
  },
  legend: {
    align: 'center',
    verticalAlign: 'bottom',
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    shadow: false,
    itemDistance: 80,
    itemStyle: {
      fontWeight: 400,
      fontSize: theme.typography.body1.fontSize,
      color: Highcharts.Color(theme.palette.text.primary)
        .setOpacity(0.8)
        .get('rgba')
    },
    itemHoverStyle: {
      color: 'chartreuse'
    }
  },
  credits: {
    enabled: false
  },
  tooltip: {
    headerFormat: '<b>{point.x}</b><br/>',
    pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal:,.0f}'
  },
  plotOptions: {
    column: {
      borderWidth: 0,
      stacking: 'normal',
      dataLabels: {
        enabled: false
      }
    },
    series: {
      pointPadding: 0.1,
      groupPadding: 0,
      borderWidth: 0,
      shadow: false,
      events: {
        legendItemClick: function() {
          return false
        },
        mouseOver: function() {
          highlightLegendItemBySeriesMouseHover(this)
        },
        mouseOut: function() {
          highlightLegendItemBySeriesMouseOut(this)
        }
      }
    }
  },
  series: totalData.sourceNames.map(sourceName => ({
    name: sourceName.name,
    color: sourceName.color,
    data: totalData.data.map(item => item.sources[sourceName.name] || 0)
  }))
})

const chartCallback = chart => {
  highlightLegendItemByLegend(chart.series)
}

const DownloadsTotal = ({ sourceData }) => {
  const classes = useStyles()
  const totalData = getDownloadsTotalData(sourceData)
  const options = getOptions(totalData)

  return (
    <div className={classes.root}>
      <HighchartsReact highcharts={Highcharts} options={options} callback={chartCallback} />
    </div>
  )
}

DownloadsTotal.propTypes = {
  sourceData: PropTypes.array
}

export default DownloadsTotal

import React, { useMemo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import * as Highcharts from 'highcharts'
import dfFormat from 'date-fns/format'
import HighchartsReact from 'highcharts-react-official'
import PropTypes from 'prop-types'

import styles from './styles'
import theme from 'config/theme'

const useStyles = makeStyles(styles)

const getOptions = chartTotals => ({
  chart: {
    type: 'area',
    backgroundColor: 'transparent',
    height: 240,
    style: {
      fontFamily: 'Roboto'
    }
  },
  title: false,
  xAxis: {
    type: 'datetime',
    gridLineWidth: 1,
    color: 'rgba(255, 255, 255, .2)',
    lineColor: 'rgba(255, 255, 255, .2)',
    gridLineColor: 'rgba(255, 255, 255, .2)',
    tickColor: 'rgba(255, 255, 255, .2)',
    labels: {
      style: {
        color: theme.palette.text.primary
      },
      formatter: function() {
        return dfFormat(this.value, 'dd/MM/yy')
      }
    }
  },
  yAxis: {
    title: false,
    gridLineWidth: 1,
    color: 'rgba(255, 255, 255, .2)',
    lineColor: theme.palette.text.secondary,
    gridLineColor: 'rgba(255, 255, 255, .2)',
    tickColor: 'rgba(255, 255, 255, .2)',
    labels: {
      style: {
        color: theme.palette.text.primary
      }
    }
  },
  tooltip: {
    shared: true
  },
  legend: {
    enabled: false
  },
  credits: {
    enabled: false
  },
  plotOptions: {
    area: {
      fillColor: {
        linearGradient: {
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 1
        },
        stops: [
          [
            0,
            Highcharts.Color(theme.palette.primary.main)
              .setOpacity(0.8)
              .get('rgba')
          ],
          [
            1,
            Highcharts.Color(theme.palette.primary.main)
              .setOpacity(0.1)
              .get('rgba')
          ]
        ]
      },
      color: theme.palette.primary.main,
      lineColor: theme.palette.primary.main,
      lineWidth: 2,
      states: {
        hover: {
          lineWidth: 2
        }
      },
      threshold: null
    }
  },
  series: [
    {
      type: 'area',
      name: 'Total Downloads',
      data: chartTotals ? chartTotals.map(item => [new Date(item.entryDate).getTime(), item.downloads]) : []
    }
  ]
})

const DownloadsChart = ({ chartTotals }) => {
  const classes = useStyles()
  const options = useMemo(() => getOptions(chartTotals), [chartTotals])

  return (
    <div className={classes.root}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  )
}

DownloadsChart.propTypes = {
  loading: PropTypes.bool,
  totals: PropTypes.object
}

export default DownloadsChart

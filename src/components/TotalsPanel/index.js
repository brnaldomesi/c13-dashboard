import * as Highcharts from 'highcharts'

import React, { useMemo } from 'react'

import HighchartsReact from 'highcharts-react-official'
import PropTypes from 'prop-types'
import { getUTCDateStr } from 'utils/helpers'
import theme from 'config/theme'

const getOptions = totals => ({
  chart: {
    type: 'area',
    backgroundColor: 'transparent',
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
        return getUTCDateStr(this.value, 'M/D/YY')
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
      data: totals ? totals.chartData.map(item => [+getUTCDateStr(item.date, 'x'), item.count]) : []
    }
  ]
})

const TotalsPanel = ({ totals }) => {
  const options = useMemo(() => getOptions(totals), [totals])
  return <HighchartsReact highcharts={Highcharts} options={options} />
}

TotalsPanel.propTypes = {
  totals: PropTypes.object
}

export default TotalsPanel

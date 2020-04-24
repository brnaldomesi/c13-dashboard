import * as Highcharts from 'highcharts'

import React, { useMemo } from 'react'

import HighchartsReact from 'highcharts-react-official'
import PropTypes from 'prop-types'
import dfFormat from 'date-fns/format'
import { numberWithCommas } from 'utils/helpers'
import theme from 'config/theme'

const getOptions = last48Hours => ({
  chart: {
    type: 'column',
    backgroundColor: 'transparent',
    style: {
      fontFamily: 'Roboto'
    }
  },
  title: false,
  xAxis: {
    type: 'category',
    color: 'rgba(255, 255, 255, .2)',
    lineColor: 'rgba(255, 255, 255, .2)',
    gridLineColor: 'rgba(255, 255, 255, .2)',
    tickColor: 'rgba(255, 255, 255, .2)',
    labels: {
      style: {
        color: theme.palette.text.primary
      }
    },
    categories: last48Hours.map(item => {
      return dfFormat(Date.parse(item.date), 'h a')
    }),
    tickInterval: 3
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
    shared: true,
    formatter: function() {
      return (
        '<b>' +
        dfFormat(Date.parse(this.points[0].key), 'E MMM d yyyy') +
        '</b><br/>' +
        '<b>' +
        dfFormat(Date.parse(this.points[0].key), 'h a') +
        '</b><br/>' +
        '<b>Downloads: </b><b style="color: ' +
        theme.palette.primary.main +
        '; font-weight: bolder; font-size:' +
        theme.spacing(2) +
        '">' +
        numberWithCommas(this.y) +
        '</b>'
      )
    }
  },
  legend: {
    enabled: false
  },
  credits: {
    enabled: false
  },
  plotOptions: {
    pointPadding: 0.1,
    groupPadding: 0,
    borderWidth: 0,
    shadow: false,
    series: {
      borderColor: theme.palette.primary.main
    }
  },
  series: [
    {
      color: theme.palette.primary.main,
      data: last48Hours ? last48Hours.map(item => [item.date, item.count]) : []
    }
  ]
})

const HourlyPanel = ({ last48Hours }) => {
  const options = useMemo(() => getOptions(last48Hours), [last48Hours])

  return <HighchartsReact highcharts={Highcharts} options={options} />
}

HourlyPanel.propTypes = {
  last48Hours: PropTypes.array
}

export default HourlyPanel

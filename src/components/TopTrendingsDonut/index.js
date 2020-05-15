import React, { useMemo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import * as Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import PropTypes from 'prop-types'

import styles from './styles'

const useStyles = makeStyles(styles)

const getOptions = topTrendings => ({
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: 0,
    plotShadow: false,
    backgroundColor: 'transparent',
    height: null,
    style: {
      fontFamily: 'Roboto'
    }
  },
  title: false,
  credits: {
    enabled: false
  },
  tooltip: {
    pointFormat: '<b>Downloads</b>:{point.y}<br /><b>Percentage</b>: {point.percentage:.1f}%'
  },
  accessibility: {
    point: {
      valueSuffix: '%'
    }
  },
  plotOptions: {
    pie: {
      borderColor: 'transparent',
      dataLabels: {
        enabled: false
      },
      center: ['50%', '50%'],
      size: '100%'
    }
  },
  series: [
    {
      type: 'pie',
      name: 'Downloads',
      innerSize: '65%',
      colors: topTrendings.map(item => item.color || 'gray'),
      data: topTrendings.map(item => [item.mediaName, item.downloads])
    }
  ]
})

const TopTrendingsDonut = ({ topTrendings }) => {
  const classes = useStyles()
  const options = useMemo(() => getOptions(topTrendings), [topTrendings])

  return (
    <div className={classes.root}>
      <HighchartsReact highcharts={Highcharts} options={options} containerProps={{ className: classes.donut }} />
    </div>
  )
}

TopTrendingsDonut.propTypes = {
  loading: PropTypes.bool,
  totals: PropTypes.object
}

export default TopTrendingsDonut

import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import * as Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import PropTypes from 'prop-types'

import { getDownloadsPercentageData } from '../helpers'
import styles from './styles'
import theme from 'config/theme'

const useStyles = makeStyles(styles)

const getOptions = data => ({
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
    pointFormat: '<b>Percentage</b>:{point.y:.1f}%'
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
      size: '100%',
      showInLegend: true
    }
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
      color: theme.palette.text.primary
    }
  },
  series: [
    {
      type: 'pie',
      name: 'Downloads',
      innerSize: '65%',
      data
    }
  ]
})

const DownloadsPercentage = ({ percentages }) => {
  const classes = useStyles()
  const data = getDownloadsPercentageData(percentages)
  const options = getOptions(data)
  return (
    <div className={classes.root}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  )
}

DownloadsPercentage.propTypes = {
  sourceData: PropTypes.array
}

export default DownloadsPercentage

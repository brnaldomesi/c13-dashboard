import React, { useMemo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import * as Highcharts from 'highcharts'
import dfFormat from 'date-fns/format'
import HighchartsReact from 'highcharts-react-official'
import PropTypes from 'prop-types'

import styles from './styles'
import theme from 'config/theme'

const mapData = Highcharts.geojson(Highcharts.map['countries/us/us-all-all'])

const useStyles = makeStyles(styles)

const getOptions = chartsData => ({
  title: {
    enabled: false
  },
  mapNavigation: {
    enabled: true,
    enableButtons: false
  },

  xAxis: {
    labels: {
      enabled: false
    }
  },

  colorAxis: {
    labels: {
      format: '{value}%'
    }
  },

  series: [
    {
      mapData: mapData,
      data: chartsData.map(item => ({
        ucName: item.marketName,
        value: item.downloads
      })),
      joinBy: 'ucName',
      name: 'Unemployment rate per 2015',
      states: {
        hover: {
          color: '#a4edba'
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function() {
          return this.point.properties['hc-a2']
        },
        style: {
          fontSize: '10px'
        }
      },
      tooltip: {
        valueSuffix: '%'
      }
    },
    {
      type: 'mapline',
      data: Highcharts.geojson(Highcharts.maps['countries/us/us-all-all'], 'mapline'),
      color: 'silver'
    }
  ]
})

const HeatMap = ({ chartsData }) => {
  const classes = useStyles()
  const options = useMemo(() => getOptions(chartsData), [chartsData])
  return (
    <div className={classes.root}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  )
}

HeatMap.propTypes = {
  loading: PropTypes.bool,
  totals: PropTypes.object
}

export default HeatMap

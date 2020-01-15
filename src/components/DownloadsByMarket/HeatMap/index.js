import React, { useMemo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import * as Highcharts from 'highcharts'
import highchartsMap from 'highcharts/modules/map'
import HighchartsReact from 'highcharts-react-official'
import mapData from '@highcharts/map-collection/countries/us/us-all-all.geo.json'
import PropTypes from 'prop-types'

import styles from './styles'
import theme from 'config/theme'

highchartsMap(Highcharts)

const useStyles = makeStyles(styles)

const countiesMap = mapData

const lines = Highcharts.geojson(mapData, 'mapline')

const borderLines = Highcharts.grep(lines, l => {
  return l.properties['hc-group'] === '__border_lines__'
})

const separatorLines = Highcharts.grep(lines, l => {
  return l.properties['hc-group'] === '__separator_lines__'
})

const getOptions = chartsData => ({
  title: false,
  chart: {
    backgroundColor: 'transparent',
    height: 600,
    borderWidth: 1,
    marginRight: 20,
    map: 'countries/us/us-all-all'
  },
  credits: {
    enabled: false
  },
  legend: {
    layout: 'horizontal',
    align: 'right',
    floating: true,
    backgroundColor: 'transparent',
    itemStyle: {
      color: Highcharts.Color(theme.palette.text.primary)
        .setOpacity(0.8)
        .get('rgba')
    }
  },
  mapNavigation: {
    enabled: false,
    enableButtons: false
  },
  xAxis: {
    labels: {
      enabled: false
    }
  },
  colorAxis: {
    min: 0,
    max: 25,
    tickInterval: 5,
    stops: [[0, '#F1EEF6'], [0.65, '#900037'], [1, '#500007']],
    labels: {
      format: '{value}%'
    }
  },
  plotOptions: {
    mapline: {
      showInLegend: false,
      enableMouseTracking: false
    }
  },

  series: [
    {
      mapData: countiesMap,
      data: chartsData.map(item => ({
        ucName: item.marketName,
        value: item.downloads
      })),
      joinBy: 'ucName',
      name: 'Downloads',
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
      name: 'State borders',
      data: borderLines,
      color: 'white',
      shadow: false
    },
    {
      type: 'mapline',
      name: 'Separator',
      data: separatorLines,
      color: 'gray',
      shadow: false
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

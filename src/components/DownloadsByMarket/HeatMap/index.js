import React, { useMemo } from 'react'

import Box from '@material-ui/core/Box'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import PropTypes from 'prop-types'
import fp from 'lodash/fp'
import highchartsMap from 'highcharts/modules/map'
import mapData from './us-dma.geo.json'
import theme from 'config/theme'

highchartsMap(Highcharts)

const nameAddedFeatures = mapData.features.map(item => ({
  ...item,
  properties: {
    ...item.properties,
    name: item.properties.dma_name
  }
}))

const countiesMap = fp.set('features', nameAddedFeatures)(mapData)

const lines = Highcharts.geojson(mapData, 'mapline')

const borderLines = Highcharts.grep(lines, l => {
  return l.properties['hc-group'] === '__border_lines__'
})

const separatorLines = Highcharts.grep(lines, l => {
  return l.properties['hc-group'] === '__separator_lines__'
})

const getOptions = chartsData => ({
  chart: {
    backgroundColor: 'transparent',
    height: 600,
    marginRight: 20
  },

  title: false,

  credits: {
    enabled: false
  },

  legend: {
    layout: 'horizontal',
    align: 'right',
    verticalAlign: 'top',
    floating: true
  },

  mapNavigation: {
    enabled: false,
    enableButtons: false,
    enableMouseWheelZoom: false
  },

  colorAxis: {
    min: Math.min.apply(Math, chartsData.map(({ downloads }) => downloads)),
    max: Math.max.apply(Math, chartsData.map(({ downloads }) => downloads)),
    type: 'logarithmic',
    allowNegativeLog: true
  },

  series: [
    {
      mapData: countiesMap,
      data: chartsData.map(item => ({
        dma_name: item.marketName,
        value: item.downloads
      })),
      joinBy: ['dma_name'],
      name: 'Downloads',
      borderWidth: 0.5,
      states: {
        hover: {
          color: theme.cadence.mapHover
        }
      },
      shadow: false
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
  const options = useMemo(() => getOptions(chartsData), [chartsData])
  return (
    <Box py={4}>
      <HighchartsReact constructorType={'mapChart'} highcharts={Highcharts} options={options} />
    </Box>
  )
}

HeatMap.propTypes = {
  loading: PropTypes.bool,
  totals: PropTypes.object
}

export default HeatMap

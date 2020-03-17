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
    name: item.properties.dma_name,
    lat: item.properties.latitude,
    lon: item.properties.longitude
  }
}))

const countiesMap = fp.set('features', nameAddedFeatures)(mapData)

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
      name: 'Basemap',
      mapData: mapData,
      borderColor: 'white',
      nullColor: theme.cadence.mapNullColor,
      showInLegend: false
    },
    {
      mapData: countiesMap,
      data: chartsData.map(item => ({
        dma_name: item.marketName,
        z: item.downloads
      })),
      joinBy: ['dma_name'],
      type: 'mapbubble',
      dataLabels: {
        enabled: true,
        format: ''
      },
      name: 'Downloads',
      maxSize: '10%',
      states: {
        hover: {
          color: theme.cadence.mapHover
        }
      }
    }
  ]
})

const BubbleMap = ({ chartsData }) => {
  const options = useMemo(() => getOptions(chartsData), [chartsData])
  return (
    <Box py={4}>
      <HighchartsReact constructorType={'mapChart'} highcharts={Highcharts} options={options} />
    </Box>
  )
}

BubbleMap.propTypes = {
  loading: PropTypes.bool,
  totals: PropTypes.object
}

export default BubbleMap

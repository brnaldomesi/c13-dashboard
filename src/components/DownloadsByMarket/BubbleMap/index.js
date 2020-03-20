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
    minColor: 'white',
    maxColor: theme.cadence.mapMax,
    stops: [
      [0, 'white'],
      [0.00039, theme.cadence.mapMin],
      [0.0039, theme.cadence.mapStep1],
      [0.0078, theme.cadence.mapStep2],
      [0.078, theme.cadence.mapStep3],
      [0.1, theme.cadence.mapStep4],
      [0.2, theme.cadence.mapStep5],
      [0.3, theme.cadence.mapStep6],
      [1, theme.cadence.mapMax]
    ]
  },

  series: [
    {
      name: 'Basemap',
      mapData: mapData,
      borderColor: 'gray',
      nullColor: 'white',
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

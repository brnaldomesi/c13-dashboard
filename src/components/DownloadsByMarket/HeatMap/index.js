import * as Highcharts from 'highcharts'

import React, { useMemo } from 'react'

import Box from '@material-ui/core/Box'
import HighchartsReact from 'highcharts-react-official'
import PropTypes from 'prop-types'
import fp from 'lodash/fp'
import highchartsMap from 'highcharts/modules/map'
import mapData from '@highcharts/map-collection/countries/us/us-all-all.geo.json'
import theme from 'config/theme'

highchartsMap(Highcharts)

const upperCaseFeatures = mapData.features.map(item => ({
  ...item,
  properties: {
    ...item.properties,
    name: item.properties.name && item.properties.name.toUpperCase()
  }
}))

const countiesMap = fp.set('features', upperCaseFeatures)(mapData)

const lines = Highcharts.geojson(mapData, 'mapline')

const borderLines = Highcharts.grep(lines, l => {
  return l.properties['hc-group'] === '__border_lines__'
})

const separatorLines = Highcharts.grep(lines, l => {
  return l.properties['hc-group'] === '__separator_lines__'
})

const getOptions = chartsData => {
  return {
    chart: {
      backgroundColor: 'transparent',
      height: 600,
      marginRight: 20,
      map: 'countries/us/us-all-all'
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
      enabled: true,
      enableButtons: false
    },

    colorAxis: {
      min: Math.min.apply(
        Math,
        chartsData.map(({ downloads }) => downloads)
      ),
      max: Math.max.apply(
        Math,
        chartsData.map(({ downloads }) => downloads)
      ),
      tickInterval: 2000000,
      stops: [
        [0, theme.cadence.downloadsDensityLowColor],
        [0.65, theme.cadence.downloadsDensityMediumColor],
        [1, theme.cadence.downloadsDensityHighColor]
      ]
    },

    series: [
      {
        mapData: countiesMap,
        data: chartsData.map(item => ({
          countyName: item.marketName,
          value: item.downloads
        })),
        joinBy: ['name', 'countyName'],
        name: 'Downloads',
        borderWidth: 0.5,
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
  }
}

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

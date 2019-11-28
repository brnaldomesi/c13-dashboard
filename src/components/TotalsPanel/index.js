import React, { useMemo, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import * as Highcharts from 'highcharts'
import Button from '@material-ui/core/Button'
import dfFormat from 'date-fns/format'
import fp from 'lodash/fp'
import HighchartsReact from 'highcharts-react-official'
import PropTypes from 'prop-types'

import { downloadCSV } from 'utils/exporting'
import LoadingIndicator from 'components/LoadingIndicator'
import IconExport from 'icons/IconExport'
import Panel from 'components/Panel'
import styles from './styles'
import theme from 'config/theme'

const useStyles = makeStyles(styles)

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
        return dfFormat(this.value, 'dd/MM/yy')
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
      data: totals ? totals.chartData.map(item => [new Date(item.date).getTime(), item.count]) : []
    }
  ]
})

const csvHeader = 'Week,Listens'

const getCSVData = fp.compose(
  fp.join('\n'),
  items => [csvHeader, ...items],
  fp.map(item => [new Date(item.date).toDateString(), item.count].join(',')),
  fp.defaultTo([]),
  fp.get('chartData')
)

const TotalsPanel = ({ loading, totals }) => {
  const classes = useStyles()
  const options = useMemo(() => getOptions(totals), [totals])

  const handleExport = useCallback(() => {
    const csv = getCSVData(totals)
    downloadCSV(csv, 'totalDownloadsChartData.csv')
  }, [totals])

  return (
    <div className={classes.root}>
      <Panel>
        <Panel.Header
          title="Total"
          action={
            <Button className={classes.export} startIcon={<IconExport />} onClick={handleExport}>
              Export
            </Button>
          }
        />
        <Panel.Content>
          {loading ? <LoadingIndicator /> : <HighchartsReact highcharts={Highcharts} options={options} />}
        </Panel.Content>
      </Panel>
    </div>
  )
}

TotalsPanel.propTypes = {
  loading: PropTypes.bool,
  totals: PropTypes.object
}

export default TotalsPanel

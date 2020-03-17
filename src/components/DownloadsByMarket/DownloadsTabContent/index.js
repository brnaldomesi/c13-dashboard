import React, { useCallback } from 'react'

import BubbleMap from '../BubbleMap'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import DownloadsChart from '../DownloadsChart'
import { FormattedNumber } from 'react-intl'
import Grid from '@material-ui/core/Grid'
import IconExport from 'icons/IconExport'
import PropTypes from 'prop-types'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { downloadCSV } from 'utils/exporting'
import { escapeCsvColumnText } from 'utils/helpers'
import fp from 'lodash/fp'
import { makeStyles } from '@material-ui/core/styles'
import styles from './styles'

const useStyles = makeStyles(styles)

const getPercentage = (value, total) => value / (total || 1)

const csvHeader = ['Name', 'Downloads', 'Percent'].join(',')

const getCSVData = totalDownloads =>
  fp.compose(
    fp.join('\n'),
    items => [csvHeader, ...items],
    fp.map(item =>
      [escapeCsvColumnText(item.marketName), item.downloads, getPercentage(item.downloads, totalDownloads)].join(',')
    ),
    fp.defaultTo([])
  )

const getChartsData = (marketTotals, selected) =>
  fp.compose(
    fp.map(fp.get('marketChartData')),
    fp.filter(item => selected.includes(item.marketName))
  )(marketTotals)

const DownloadsTabContent = ({ chartTotals = [], marketTotals = [], tabKey, viewMore }) => {
  const classes = useStyles()
  const [selected, setSelected] = React.useState([])
  const tableData = fp.compose(
    fp.slice(0, viewMore ? 20 : 5),
    fp.sortBy(item => -item.downloads)
  )(marketTotals)
  const totalDownloads = fp.sumBy('downloads')(marketTotals)
  const rowCount = tableData.length
  const numSelected = selected.length

  const handleExport = useCallback(() => {
    const csv = getCSVData(totalDownloads)(marketTotals)
    downloadCSV(csv, `${tabKey}ChartData.csv`)
  }, [marketTotals, tabKey, totalDownloads])

  const handleSelectAllClick = useCallback(
    event => {
      if (event.target.checked) {
        const newSelecteds = tableData.map(n => n.marketName)
        setSelected(newSelecteds)
        return
      }
      setSelected([])
    },
    [tableData]
  )

  const handleClick = useCallback(
    (event, name) => {
      const newSelected = fp.xor(selected, [name])
      setSelected(newSelected)
    },
    [selected]
  )

  const isSelected = name => selected.indexOf(name) !== -1

  const chartsData = numSelected ? getChartsData(marketTotals, selected) : [chartTotals]

  return (
    <div className={classes.root}>
      <div className={classes.exportWrap}>
        <Button className={classes.export} startIcon={<IconExport />} onClick={handleExport}>
          Export
        </Button>
      </div>
      <div className={classes.content}>
        {tabKey === 'us' && <BubbleMap chartsData={marketTotals} />}
        <Grid container spacing={2}>
          <Grid item xs={7}>
            <Table className={classes.table} size="small">
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      indeterminate={numSelected > 0 && numSelected < rowCount}
                      checked={numSelected === rowCount}
                      onChange={handleSelectAllClick}
                      color="primary"
                    />
                  </TableCell>
                  <TableCell>MARKET</TableCell>
                  <TableCell align="right">DOWNLOADS</TableCell>
                  <TableCell>SHARE</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.map(item => {
                  const isItemSelected = isSelected(item.marketName)
                  return (
                    <TableRow
                      key={item.marketName}
                      selected={isItemSelected}
                      hover
                      className={classes.row}
                      onClick={event => handleClick(event, item.marketName)}>
                      <TableCell padding="checkbox" className={classes.cell}>
                        <Checkbox checked={isItemSelected} color="primary" />
                      </TableCell>
                      <TableCell className={classes.cell}>{item.marketName}</TableCell>
                      <TableCell align="right" className={classes.cell}>
                        <FormattedNumber value={item.downloads} format="decimal" />
                      </TableCell>
                      <TableCell className={classes.cell}>
                        <FormattedNumber value={getPercentage(item.downloads, totalDownloads)} format="percent" />
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </Grid>
          <Grid item xs={5}>
            <DownloadsChart chartsData={chartsData} key={tabKey} />
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

DownloadsTabContent.propTypes = {
  sourceData: PropTypes.array
}

export default DownloadsTabContent

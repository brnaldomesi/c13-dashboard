import { FormattedDate, FormattedNumber } from 'react-intl'
import React, { useCallback } from 'react'
import { networksRankingsLoadingSelector, networksRankingsSelector } from 'redux/modules/media'

import Button from '@material-ui/core/Button'
import IconExport from 'icons/IconExport'
import LoadingIndicator from 'components/LoadingIndicator'
import Panel from 'components/Panel'
import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'
import SortableTableHead from 'components/SortableTableHead'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { downloadCSV } from 'utils/exporting'
import { escapeCsvColumnText } from 'utils/helpers'
import fp from 'lodash/fp'
import get from 'lodash/get'
import { makeStyles } from '@material-ui/core/styles'
import styles from './styles'
import withPaginationHandler from 'hocs/withPaginationHandler'
import { withRouter } from 'react-router-dom'
import withSortHandler from 'hocs/withSortHandler'

const useStyles = makeStyles(styles)

const columns = [
  {
    id: 'name',
    label: <strong>NETWORK TITLE</strong>,
    csvTitle: 'Title',
    csvFormatter: escapeCsvColumnText
  },
  {
    id: 'publishDate',
    csvTitle: 'Start Date',
    label: <strong>START DATE</strong>
  },
  {
    id: 'downloads.dayOneDownloads',
    label: (
      <strong>
        {'24HR / '}
        <Typography variant="body2" color="primary" component="span">
          <strong>RANK</strong>
        </Typography>
      </strong>
    ),
    csvTitle: '24HR'
  },
  {
    id: 'downloads.weekOneDownloads',
    label: (
      <strong>
        {'WEEK 1 / '}
        <Typography variant="body2" color="primary" component="span">
          <strong>RANK</strong>
        </Typography>
      </strong>
    ),
    csvTitle: 'Week 1'
  },
  {
    id: 'downloads.totalDownloads',
    label: (
      <strong>
        {'TOTAL / '}
        <Typography variant="body2" color="primary" component="span">
          <strong>RANK</strong>
        </Typography>
      </strong>
    ),
    csvTitle: 'Total'
  }
]

const csvHeader = columns.map(fp.get('csvTitle')).join(',')

const getCSVData = fp.compose(
  fp.join('\n'),
  items => [csvHeader, ...items],
  fp.map(item =>
    columns
      .map(column => {
        const val = get(item, column.id) || 'N/A'
        return column.csvFormatter ? column.csvFormatter(val) : val
      })
      .join(',')
  ),
  fp.defaultTo([])
)

const NetworksTable = ({
  history,
  networks,
  networksLoading,
  paginationProps: { paginatedList, ...paginationProps },
  sortProps: { onRequestSort, order, orderBy }
}) => {
  const classes = useStyles()

  const handleExport = useCallback(() => {
    const csv = getCSVData(networks)
    downloadCSV(csv, 'Networks.csv')
  }, [networks])

  const handleRowClick = useCallback(
    networkId => () => {
      history.push(`/${networkId}`)
    },
    [history]
  )

  return (
    <Panel>
      <Panel.Header
        title={`All Networks | ${networks.length} TOTAL`}
        action={
          <Button className={classes.export} startIcon={<IconExport />} onClick={handleExport}>
            Export
          </Button>
        }
      />
      <Panel.Content>
        {networksLoading ? (
          <div className={classes.center}>
            <LoadingIndicator isStatic size={32} />
          </div>
        ) : (
          <TableContainer component={Paper}>
            <Table className={classes.table} size="small">
              <SortableTableHead columns={columns} onRequestSort={onRequestSort} order={order} orderBy={orderBy} />
              <TableBody>
                {paginatedList.map(network => (
                  <TableRow
                    key={network.networkId}
                    hover
                    className={classes.row}
                    onClick={handleRowClick(network.networkId)}>
                    <TableCell className={classes.cell}>{network.name}</TableCell>

                    <TableCell className={classes.cell}>
                      <FormattedDate format="numericDate" value={network.publishDate} />
                    </TableCell>

                    <TableCell className={classes.figure}>
                      <FormattedNumber value={get(network, 'downloads.dayOneDownloads')} />
                      {' / '}
                      <Typography variant="body2" color="primary" component="span">
                        <FormattedNumber value={get(network, 'rankings.dayOneDownloads')} />
                      </Typography>
                    </TableCell>

                    <TableCell className={classes.figure}>
                      <FormattedNumber value={get(network, 'downloads.weekOneDownloads')} />
                      {' / '}
                      <Typography variant="body2" color="primary" component="span">
                        <FormattedNumber value={get(network, 'rankings.weekOneDownloads')} />
                      </Typography>
                    </TableCell>

                    <TableCell className={classes.figure}>
                      <FormattedNumber value={get(network, 'downloads.totalDownloads')} />
                      {' / '}
                      <Typography variant="body2" color="primary" component="span">
                        <FormattedNumber value={get(network, 'rankings.totalDownloads')} />
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Panel.Content>
      <Panel.Footer>
        <TablePagination component="div" count={networks.length} {...paginationProps} />
      </Panel.Footer>
    </Panel>
  )
}

NetworksTable.propTypes = {
  history: PropTypes.object.isRequired,
  networks: PropTypes.array,
  networksLoading: PropTypes.bool,
  paginationProps: PropTypes.object,
  sortProps: PropTypes.object
}

const selector = createStructuredSelector({
  networks: networksRankingsSelector,
  networksLoading: networksRankingsLoadingSelector
})

export default compose(
  withRouter,
  connect(selector),
  withSortHandler({ listPropName: 'networks' }),
  withPaginationHandler({ listPropName: 'sortProps.sortedList' })
)(NetworksTable)

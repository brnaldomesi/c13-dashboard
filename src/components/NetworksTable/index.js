import React, { useCallback } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { FormattedDate, FormattedNumber } from 'react-intl'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import get from 'lodash/get'
import PropTypes from 'prop-types'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'

import { networksRankingsSelector, networksRankingsLoadingSelector } from 'redux/modules/media'
import IconExport from 'icons/IconExport'
import Panel from 'components/Panel'
import SortableTableHead from 'components/SortableTableHead'
import styles from './styles'
import withPaginationHandler from 'hocs/withPaginationHandler'
import withSortHandler from 'hocs/withSortHandler'
import LoadingIndicator from 'components/LoadingIndicator'

const useStyles = makeStyles(styles)

const columns = [
  {
    id: 'name',
    label: <strong>NETWORK TITLE</strong>
  },
  {
    id: 'publishDate',
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
    )
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
    )
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
    )
  }
]

const NetworksTable = ({
  networks,
  networksLoading,
  paginationProps: { paginatedList, ...paginationProps },
  sortProps: { onRequestSort, order, orderBy }
}) => {
  const classes = useStyles()
  const handleExport = useCallback(() => {}, [])

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
          <LoadingIndicator isStatic />
        ) : (
          <Table className={classes.table} size="small">
            <SortableTableHead columns={columns} onRequestSort={onRequestSort} order={order} orderBy={orderBy} />
            <TableBody>
              {paginatedList.map(network => (
                <TableRow key={network.networkId} hover className={classes.row}>
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
        )}
      </Panel.Content>
      <Panel.Footer>
        <TablePagination component="div" count={networks.length} {...paginationProps} />
      </Panel.Footer>
    </Panel>
  )
}

NetworksTable.propTypes = {
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
  connect(selector),
  withSortHandler({ listPropName: 'networks' }),
  withPaginationHandler({ listPropName: 'sortProps.sortedList' })
)(NetworksTable)

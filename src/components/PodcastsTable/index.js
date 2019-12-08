import React, { useCallback } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { FormattedDate, FormattedNumber } from 'react-intl'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import find from 'lodash/find'
import fp from 'lodash/fp'
import get from 'lodash/get'
import PropTypes from 'prop-types'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'

import { downloadCSV } from 'utils/exporting'
import { escapeCsvColumnText } from 'utils/helpers'
import { getRankings } from 'utils/helpers'
import { mediaRankingTablesSelector } from 'redux/modules/media'
import { userSeriesSelector, userSeriesLoadingSelector } from 'redux/modules/profiles'
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
    label: <strong>PODCAST TITLE</strong>,
    csvTitle: 'Title',
    csvFormatter: escapeCsvColumnText
  },
  {
    id: 'publishDate',
    label: <strong>START DATE</strong>,
    csvTitle: 'Start Date'
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

const PodcastsTable = ({
  podcasts,
  podcastsLoading,
  paginationProps: { paginatedList, ...paginationProps },
  sortProps: { onRequestSort, order, orderBy }
}) => {
  const classes = useStyles()

  const handleExport = useCallback(() => {
    const csv = getCSVData(podcasts)
    downloadCSV(csv, 'Podcasts.csv')
  }, [podcasts])

  return (
    <Panel>
      <Panel.Header
        title={`All Podcasts | ${podcasts.length} TOTAL`}
        action={
          <Button className={classes.export} startIcon={<IconExport />} onClick={handleExport}>
            Export
          </Button>
        }
      />
      <Panel.Content>
        {podcastsLoading ? (
          <LoadingIndicator isStatic />
        ) : (
          <Table className={classes.table} size="small">
            <SortableTableHead columns={columns} onRequestSort={onRequestSort} order={order} orderBy={orderBy} />
            <TableBody>
              {paginatedList.map(podcast => (
                <TableRow key={podcast.seriesId} hover className={classes.row}>
                  <TableCell className={classes.cell}>{podcast.name}</TableCell>

                  <TableCell className={classes.cell}>
                    <FormattedDate format="numericDate" value={podcast.publishDate} />
                  </TableCell>

                  <TableCell className={classes.figure}>
                    <FormattedNumber value={get(podcast, 'downloads.dayOneDownloads')} />
                    {' / '}
                    <Typography variant="body2" color="primary" component="span">
                      <FormattedNumber value={get(podcast, 'rankings.dayOneDownloads')} />
                    </Typography>
                  </TableCell>

                  <TableCell className={classes.figure}>
                    <FormattedNumber value={get(podcast, 'downloads.weekOneDownloads')} />
                    {' / '}
                    <Typography variant="body2" color="primary" component="span">
                      <FormattedNumber value={get(podcast, 'rankings.weekOneDownloads')} />
                    </Typography>
                  </TableCell>

                  <TableCell className={classes.figure}>
                    <FormattedNumber value={get(podcast, 'downloads.totalDownloads')} />
                    {' / '}
                    <Typography variant="body2" color="primary" component="span">
                      <FormattedNumber value={get(podcast, 'rankings.totalDownloads')} />
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Panel.Content>
      <Panel.Footer>
        <TablePagination component="div" count={podcasts.length} {...paginationProps} />
      </Panel.Footer>
    </Panel>
  )
}

PodcastsTable.propTypes = {
  networkId: PropTypes.string,
  podcasts: PropTypes.array,
  podcastsLoading: PropTypes.bool,
  paginationProps: PropTypes.object,
  sortProps: PropTypes.object
}

export const podcastsRankingSelector = (state, { networkId }) => {
  const podcasts = get(userSeriesSelector(state), networkId) || []
  const mediaRankingTables = mediaRankingTablesSelector(state)
  return podcasts.map(podcast => {
    const downloads = find(mediaRankingTables, { mediaId: podcast.seriesId })
    return {
      ...podcast,
      downloads,
      rankings: getRankings(downloads, mediaRankingTables)
    }
  })
}

const selector = createStructuredSelector({
  podcasts: podcastsRankingSelector,
  podcastsLoading: userSeriesLoadingSelector
})

export default compose(
  connect(selector),
  withSortHandler({ listPropName: 'podcasts' }),
  withPaginationHandler({ listPropName: 'sortProps.sortedList' })
)(PodcastsTable)

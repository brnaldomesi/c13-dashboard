import { FormattedDate, FormattedNumber } from 'react-intl'
import React, { useCallback } from 'react'
import { episodesRankingsLoadingSelector, episodesRankingsSelector } from 'redux/modules/media'
import { escapeCsvColumnText, getHmsDuration } from 'utils/helpers'

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
    label: <strong>EPISODE TITLE</strong>,
    csvTitle: 'Title',
    csvFormatter: escapeCsvColumnText
  },
  {
    id: 'publishDate',
    csvTitle: 'Pub Date',
    label: <strong>PUB DATE</strong>
  },
  {
    id: 'downloads.dayOneDownloads',
    csvTitle: '24HR',
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
    csvTitle: 'Week 1',
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
    csvTitle: 'Total',
    label: (
      <strong>
        {'TOTAL / '}
        <Typography variant="body2" color="primary" component="span">
          <strong>RANK</strong>
        </Typography>
      </strong>
    )
  },
  {
    id: 'duration',
    csvTitle: 'Duration',
    label: <strong>Duration</strong>,
    csvFormatter: getHmsDuration
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

const EpisodesTable = ({
  episodes,
  episodesLoading,
  history,
  match: {
    params: { networkId, podcastId }
  },
  paginationProps: { paginatedList, ...paginationProps },
  sortProps: { onRequestSort, order, orderBy }
}) => {
  const classes = useStyles()

  const handleExport = useCallback(() => {
    const csv = getCSVData(episodes)
    downloadCSV(csv, 'Episodes.csv')
  }, [episodes])

  const handleRowClick = useCallback(
    episodeId => () => {
      history.push(`/${networkId}/${podcastId}/${episodeId}`)
    },
    [history, networkId, podcastId]
  )

  return (
    <Panel>
      <Panel.Header
        title={`All Episodes | ${episodes.length} TOTAL`}
        action={
          <Button className={classes.export} startIcon={<IconExport />} onClick={handleExport}>
            Export
          </Button>
        }
      />
      <Panel.Content>
        {episodesLoading ? (
          <div className={classes.center}>
            <LoadingIndicator isStatic size={32} />
          </div>
        ) : (
          <TableContainer component={Paper}>
            <Table className={classes.table} size="small">
              <SortableTableHead columns={columns} onRequestSort={onRequestSort} order={order} orderBy={orderBy} />
              <TableBody>
                {paginatedList.map(episode => (
                  <TableRow
                    key={episode.episodeId}
                    hover
                    className={classes.row}
                    onClick={handleRowClick(episode.episodeId)}>
                    <TableCell className={classes.cell}>{episode.name}</TableCell>

                    <TableCell className={classes.cell}>
                      <FormattedDate format="numericDate" value={episode.publishDate} />
                    </TableCell>

                    <TableCell className={classes.figure}>
                      <FormattedNumber value={get(episode, 'downloads.dayOneDownloads')} />
                      {' / '}
                      <Typography variant="body2" color="primary" component="span">
                        <FormattedNumber value={get(episode, 'rankings.dayOneDownloads')} />
                      </Typography>
                    </TableCell>

                    <TableCell className={classes.figure}>
                      <FormattedNumber value={get(episode, 'downloads.weekOneDownloads')} />
                      {' / '}
                      <Typography variant="body2" color="primary" component="span">
                        <FormattedNumber value={get(episode, 'rankings.weekOneDownloads')} />
                      </Typography>
                    </TableCell>

                    <TableCell className={classes.figure}>
                      <FormattedNumber value={get(episode, 'downloads.totalDownloads')} />
                      {' / '}
                      <Typography variant="body2" color="primary" component="span">
                        <FormattedNumber value={get(episode, 'rankings.totalDownloads')} />
                      </Typography>
                    </TableCell>

                    <TableCell className={classes.figure}>{getHmsDuration(get(episode, 'duration'))}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Panel.Content>
      <Panel.Footer>
        <TablePagination component="div" count={episodes.length} {...paginationProps} />
      </Panel.Footer>
    </Panel>
  )
}

EpisodesTable.propTypes = {
  episodes: PropTypes.array,
  episodesLoading: PropTypes.bool,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  paginationProps: PropTypes.object,
  sortProps: PropTypes.object
}

const selector = createStructuredSelector({
  episodes: episodesRankingsSelector,
  episodesLoading: episodesRankingsLoadingSelector
})

export default compose(
  withRouter,
  connect(selector),
  withSortHandler({ listPropName: 'episodes', orderParam: 'desc', orderByParam: 'publishDate' }),
  withPaginationHandler({ listPropName: 'sortProps.sortedList' })
)(EpisodesTable)

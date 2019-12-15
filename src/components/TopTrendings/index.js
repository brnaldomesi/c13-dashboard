import React, { useCallback, useState } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { FormattedNumber } from 'react-intl'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import fp from 'lodash/fp'
import get from 'lodash/get'
import Grid from '@material-ui/core/Grid'
import IconArrowDropDown from '@material-ui/icons/ArrowDropDown'
import IconArrowDropUp from '@material-ui/icons/ArrowDropUp'
import PropTypes from 'prop-types'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'

import { topTrendingsSelector, topTrendingsLoadingSelector } from 'redux/modules/metrics'
import { userPreferenceSelector } from 'redux/modules/profiles'
import LoadingIndicator from 'components/LoadingIndicator'
import Panel from 'components/Panel'
import SortableTableHead from 'components/SortableTableHead'
import styles from './styles'
import TopTrendingsDonut from 'components/TopTrendingsDonut'
import withSortHandler from 'hocs/withSortHandler'

const useStyles = makeStyles(styles)

const columns = [
  {
    id: 'mediaName',
    label: <strong>TITLE</strong>
  },
  {
    id: 'downloads',
    label: <strong>DOWNLOADS</strong>
  },
  {
    id: 'percentage',
    label: <strong>% OF TOTAL</strong>
  }
]

const TopTrendings = ({ trendingList, mediaType, loading, sortProps: { onRequestSort, order, orderBy } }) => {
  const classes = useStyles()
  const [viewMore, setViewMore] = useState(false)
  const handleToggleViewMore = useCallback(() => {
    setViewMore(viewMore => !viewMore)
  }, [setViewMore])
  const hasManyItems = trendingList.length > 5
  const finalTrendingList = viewMore || !hasManyItems ? trendingList : trendingList.slice(0, 5)

  return (
    <Panel className={classes.root}>
      <Panel.Header title={`TOP TRENDING ${mediaType} (BASED ON DATES SELECTED)`} />
      <Panel.Content>
        {loading ? (
          <div className={classes.center}>
            <LoadingIndicator isStatic size={32} />
          </div>
        ) : (
          <Grid container spacing={3} alignItems="center">
            <Grid item xs>
              <Table className={classes.table} size="small">
                <SortableTableHead columns={columns} onRequestSort={onRequestSort} order={order} orderBy={orderBy} />
                <TableBody>
                  {finalTrendingList.map(trendingItem => (
                    <TableRow key={trendingItem.trendingItemId} hover className={classes.row}>
                      <TableCell className={classes.cell}>
                        <Typography variant="body1">{trendingItem.mediaName}</Typography>
                      </TableCell>

                      <TableCell className={classes.figure}>
                        <Typography variant="body1">
                          <FormattedNumber value={get(trendingItem, 'downloads')} />
                        </Typography>
                      </TableCell>

                      <TableCell className={classes.figure}>
                        <Typography variant="body1">
                          <FormattedNumber value={get(trendingItem, 'percentage')} format="percentRounded" />
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Grid>
            <Grid item className={classes.chart}>
              <TopTrendingsDonut topTrendings={finalTrendingList} />
            </Grid>
          </Grid>
        )}
      </Panel.Content>
      {hasManyItems && (
        <Panel.Footer>
          <Button onClick={handleToggleViewMore} className={classes.moreToggle}>
            View {viewMore ? 'less' : 'more'} {viewMore ? <IconArrowDropUp /> : <IconArrowDropDown />}
          </Button>
        </Panel.Footer>
      )}
    </Panel>
  )
}

TopTrendings.propTypes = {
  trandingList: PropTypes.array,
  loading: PropTypes.bool,
  mediaType: PropTypes.string,
  sortProps: PropTypes.object
}

export const trendingListSelector = state => {
  const topTrendings = topTrendingsSelector(state)
  const totalDownloads = fp.sumBy('downloads')(topTrendings) || 1
  return topTrendings.map(trending => ({
    ...trending,
    percentage: trending.downloads / totalDownloads
  }))
}

const mediaTypeSelector = state => {
  const userPreference = userPreferenceSelector(state)
  if (!userPreference) {
    return ''
  }
  if (userPreference.trendingItemId) {
    return ''
  } else if (userPreference.seriesId) {
    return 'EPISODES'
  } else if (userPreference.networkId) {
    return 'PODCASTS'
  } else {
    return 'NETWORKS'
  }
}

const selector = createStructuredSelector({
  trendingList: trendingListSelector,
  mediaType: mediaTypeSelector,
  loading: topTrendingsLoadingSelector
})

export default compose(
  connect(selector),
  withSortHandler({ listPropName: 'trendingList' })
)(TopTrendings)

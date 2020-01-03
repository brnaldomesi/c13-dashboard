import React from 'react'
import { FormattedNumber } from 'react-intl'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import { getDownloadsBreakdownData } from '../helpers'
import styles from './styles'

const useStyles = makeStyles(styles)

const getPercentage = (value, total) => value / (total || 1)

const DownloadsBreakdown = ({ sourceData }) => {
  const classes = useStyles()
  const { data, totalDownloads } = getDownloadsBreakdownData(sourceData)
  console.log({ data })
  return (
    <div className={classes.root}>
      <Table className={classes.table} size="small">
        <TableHead>
          <TableRow>
            <TableCell>NAME</TableCell>
            <TableCell align="right">DOWNLOADS</TableCell>
            <TableCell>PERCENT</TableCell>
          </TableRow>
        </TableHead>
        {data.map(group => (
          <TableBody key={group.name}>
            <TableRow className={classes.groupRow}>
              <TableCell>
                <strong>{group.name}</strong>
              </TableCell>
              <TableCell align="right">
                <strong>
                  <FormattedNumber value={group.downloads} format="decimal" />
                </strong>
              </TableCell>
              <TableCell>
                <strong>
                  <FormattedNumber value={getPercentage(group.downloads, totalDownloads)} format="percent" />
                </strong>
              </TableCell>
            </TableRow>
            {group.sourcesList.length > 1 &&
              group.sourcesList.map(item => (
                <TableRow key={item.name}>
                  <TableCell className={classes.itemNameCol}>{item.name}</TableCell>
                  <TableCell align="right">
                    <FormattedNumber value={item.downloads} format="decimal" />
                  </TableCell>
                  <TableCell>
                    <FormattedNumber value={getPercentage(item.downloads, totalDownloads)} format="percent" />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        ))}
      </Table>
    </div>
  )
}

DownloadsBreakdown.propTypes = {
  sourceData: PropTypes.array
}

export default DownloadsBreakdown

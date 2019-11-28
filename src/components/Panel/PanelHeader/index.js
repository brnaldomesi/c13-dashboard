import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'

import styles from './styles'

const useStyles = makeStyles(styles)

const PanelHeader = ({ title, action }) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <Typography variant="subtitle1" className={classes.bold}>
          {title}
        </Typography>
      </div>
      {action && <div className={classes.action}>{action}</div>}
    </div>
  )
}

PanelHeader.propTypes = {
  title: PropTypes.node,
  action: PropTypes.node
}

export default PanelHeader
